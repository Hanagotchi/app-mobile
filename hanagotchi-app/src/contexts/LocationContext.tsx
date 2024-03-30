
import React, { createContext, useState, useEffect, PropsWithChildren } from "react";
import useLocation from "../hooks/useLocation";
import getAddressFromCoordinates from "../services/locationApi"
import { LocationUser } from "../models/LocationUser";
import * as Location from "expo-location";

export type LocationContextProps = {
    location: LocationUser | null;
    requestLocation: () => Promise<void>;
    revokeLocation: () => Promise<void>;
};

export const LocationContext = createContext<LocationContextProps>({
    location: null,
    requestLocation: () => Promise.resolve(),
    revokeLocation: () => Promise.resolve()

});

export const LocationProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [location, setLocation] = useState<LocationUser | null>(null);

    const requestLocation = async () => {
        if (location) {
            console.log("[LocationContext.tsx] Location already setted:", location)
            return;
        }
        console.log("[LocationContext.tsx] Requesting location!!")
        try {
            const { granted } = await Location.requestForegroundPermissionsAsync();
            if (granted) {

                const lastKnownPosition = await Location.getLastKnownPositionAsync();
                if (!lastKnownPosition) {
                    console.log("No hay localización conocida")
                    return;
                }
                const { latitude, longitude } = lastKnownPosition.coords;

                const geoName = await getAddressFromCoordinates(
                    latitude,
                    longitude
                );

                setLocation({ latitude, longitude, geoName } as LocationUser);
                console.log("[LocationContext.tsx] Location setted:", location)
            } else {
                console.log("No se han concedido permisos")
                return;
            }
        } catch (error) {
            console.log("Error al obtener la localización: ", error)
            throw error;
        }
    };

    const revokeLocation = async () => {
        setLocation(null);
        console.log("[LocationContext.tsx] Location revoked:", location)
    };

    const locationValues: LocationContextProps = {
        location,
        requestLocation,
        revokeLocation
    };

    return (
        <LocationContext.Provider
            value={locationValues}
        >
            {children}
        </LocationContext.Provider>
    );
};

