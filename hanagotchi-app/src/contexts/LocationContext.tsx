
import React, { createContext, useState, useEffect, PropsWithChildren } from "react";
import useLocation from "../hooks/useLocation";
import getAddressFromCoordinates from "../services/locationApi"
import { LocationUser } from "../models/LocationUser";
import * as Location from "expo-location";
import { Region } from "react-native-maps";

export type UserLocation = (Region & { geoName?: string });
export const FIUBA_REGION = { latitude: -34.61763889, longitude: -58.36805556, latitudeDelta: 0.0075, longitudeDelta: 0.0075, geoName: "CABA, Argentina" } as UserLocation;
export type LocationContextProps = {
    location: UserLocation;
    requestLocation: () => Promise<void>;
    revokeLocation: () => Promise<void>;
    changeLocation: (latitude: number, longitude: number, latitudeDelta: number, longitudeDelta: number) => void;
    completeGeoName: () => Promise<void>;
};

export const LocationContext = createContext<LocationContextProps>({
    location: {} as UserLocation,
    requestLocation: () => Promise.resolve(),
    revokeLocation: () => Promise.resolve(),
    changeLocation: (latitude: number, longitude: number, latitudeDelta: number, longitudeDelta: number) => { },
    completeGeoName: () => Promise.resolve()

});
export const LocationProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [locationSelection, setLocation] = useState<UserLocation>(FIUBA_REGION);
    
    const requestLocation = async () => {
        if (!(locationSelection == FIUBA_REGION)) {
            console.log("[LocationContext.tsx] Location already setted:", locationSelection)
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
                console.log("requestLocation / ", latitude, longitude, geoName);
                changeLocation(latitude, longitude, 0.0075, 0.0075, geoName);
            } else {
                console.log("No se han concedido permisos")
                return;
            }
        } catch (error) {
            console.log("Error al obtener la localización: ", error)
            throw error;
        }
    };

    const completeGeoName = async () => {
        // // const geoName = await getAddressFromCoordinates(
        // //     locationSelection?.latitude ?? FIUBA_REGION.latitude,
        // //     locationSelection?.longitude ?? FIUBA_REGION.longitude
        // // );
        
        // setLocation({ ...locationSelection, geoName } as UserLocation);
    };
    const revokeLocation = async () => {
        setLocation(FIUBA_REGION);
    };

    const changeLocation = (latitude: number, longitude: number, latitudeDelta: number, longitudeDelta: number, geoName: string = "--") => {
        const updatedLocation = { latitude, longitude, latitudeDelta, longitudeDelta, geoName } as UserLocation;
        console.log("CHANGELOCATIONFUN", updatedLocation);
        setLocation(updatedLocation);
    }
    const locationValues: LocationContextProps = {
        location: locationSelection,
        requestLocation,
        revokeLocation,
        changeLocation,
        completeGeoName
    };

    return (
        <LocationContext.Provider
            value={locationValues}
        >
            {children}
        </LocationContext.Provider>
    );
};

