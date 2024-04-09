
import React, { createContext, useState, PropsWithChildren } from "react";
import * as Location from "expo-location";
import { Region } from "react-native-maps";

export type UserLocation = Region;
export const DEFAULT_REGION = { latitude: -34.61763889, longitude: -58.36805556, latitudeDelta: 0.0075, longitudeDelta: 0.0075 } as UserLocation;
export type LocationContextProps = {
    location: UserLocation;
    requestLocation: () => Promise<void>;
    revokeLocation: () => Promise<void>;
    changeLocation: (latitude: number, longitude: number, latitudeDelta: number, longitudeDelta: number) => void;
};

export const LocationContext = createContext<LocationContextProps>({
    location: {} as UserLocation,
    requestLocation: () => Promise.resolve(),
    revokeLocation: () => Promise.resolve(),
    changeLocation: (latitude: number, longitude: number, latitudeDelta: number, longitudeDelta: number) => { }
});
export const LocationProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [locationSelection, setLocation] = useState<UserLocation>(DEFAULT_REGION);

    const requestLocation = async () => {
        if (locationSelection !== DEFAULT_REGION) {
            return;
        }
        try {
            const { granted } = await Location.requestForegroundPermissionsAsync();
            if (granted) {

                const lastKnownPosition = await Location.getLastKnownPositionAsync();
                if (!lastKnownPosition) {
                    console.log("No hay localización conocida")
                    return;
                }
                const { latitude, longitude } = lastKnownPosition.coords;
                changeLocation(latitude, longitude, 0.0075, 0.0075);
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
        setLocation(DEFAULT_REGION);
    };

    const changeLocation = (latitude: number, longitude: number, latitudeDelta: number, longitudeDelta: number,) => {
        const updatedLocation = { latitude, longitude, latitudeDelta, longitudeDelta } as UserLocation;
        setLocation(updatedLocation);
    }
    const locationValues: LocationContextProps = {
        location: locationSelection,
        requestLocation,
        revokeLocation,
        changeLocation,
    };

    return (
        <LocationContext.Provider
            value={locationValues}
        >
            {children}
        </LocationContext.Provider>
    );
};

