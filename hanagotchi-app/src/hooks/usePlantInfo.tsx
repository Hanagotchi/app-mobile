import { useCallback, useEffect, useState } from "react";
import { Deviation } from "../models/Measurement";
import { Plant } from "../models/Plant";
import useMyUser from "./useMyUser";
import { useApiFetch } from "./useApiFetch";
import { useHanagotchiApi } from "./useHanagotchiApi";
import { useOpenWeatherApi } from "./useOpenWeatherApi";
import { DevicePlant } from "../models/DevicePlant";

interface InfoToShow {
    origin: "Hanagotchi" | "OpenWeather",
    info: {
        temperature?: number;
        humidity?: number;
        light?: number;
        watering?: number;
        deviations?: Deviation;
        time_stamp?: Date;
    }
}

export const usePlantInfo = (plant: Plant) => {
    const [plantInfo, setPlantInfo] = useState<InfoToShow | null>(null);
    const [isFetchingInfo, setIsFetchingInfo] = useState<boolean>(false);
    const [fetchingInfoError, setFetchingInfoError] = useState<Error | null>(null);
    const {myUser} = useMyUser();
    const hanagotchiApi = useHanagotchiApi();
    const openWeatherApi = useOpenWeatherApi();
    const devicePlant = useApiFetch<DevicePlant[] | null>(() => hanagotchiApi.getDevicePlants({id_plant: plant.id}), null, [plant]);

    const fetchFromHanagotchi = useCallback(async () => {
        const measurement = await hanagotchiApi.getLastMeasurement(plant.id);
        if (!measurement) {
            setPlantInfo(null);
        } else {
            setPlantInfo({
                origin: "Hanagotchi",
                info: measurement!,
            });
        }
    }, [plant, setPlantInfo])

    const fetchFromOpenWeather = useCallback(async () => {
        if (myUser?.location) {
            const weatherData = await openWeatherApi.getCurrentWeather(myUser.location.lat!, myUser.location.long!)
            const timestamp = new Date(0);
            timestamp.setUTCSeconds(weatherData.dt);
            setPlantInfo({
                origin: "OpenWeather",
                info: {
                    temperature: Math.round(weatherData.main.temp - 273.15),
                    humidity: weatherData.main.humidity,
                    time_stamp: timestamp,
                }
            })
        } else {
            setPlantInfo(null);
        }
    }, [plant, myUser, setPlantInfo])

    useEffect(() => {
        const maybeFetchWeather = async () => {
            if (!devicePlant.fetchedData) return;

            try {
                setIsFetchingInfo(true);
                devicePlant.fetchedData.length === 0 ? fetchFromHanagotchi() : fetchFromOpenWeather();
            } catch (e) {
                setFetchingInfoError(e as Error);
                setPlantInfo(null);
            } finally {
                setIsFetchingInfo(false);
            }
        }

        maybeFetchWeather();
    }, [devicePlant]);

    return {
        plantInfo,
        isFetching: isFetchingInfo || devicePlant.isFetching,
        error: devicePlant.error ?? fetchingInfoError,
    }
}