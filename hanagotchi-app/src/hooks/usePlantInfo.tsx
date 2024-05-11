import { useCallback, useEffect, useMemo, useState } from "react";
import { Deviation } from "../models/Measurement";
import { Plant } from "../models/Plant";
import useMyUser from "./useMyUser";
import { useApiFetch } from "./useApiFetch";
import { useHanagotchiApi } from "./useHanagotchiApi";
import { useOpenWeatherApi } from "./useOpenWeatherApi";
import { DevicePlant } from "../models/DevicePlant";

type InfoToShow = {
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
    const [error, setError] = useState<Error | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const {myUser} = useMyUser();
    const hanagotchiApi = useHanagotchiApi();
    const openWeatherApi = useOpenWeatherApi();

    useEffect(() => {
        const fetchInfo = async () => {
            setIsFetching(true);
            try {
                const devicePlant = await hanagotchiApi.getDevicePlants({id_plant: plant.id});
                console.log(devicePlant);
                const measurement = await hanagotchiApi.getLastMeasurement(plant.id);
                if (!measurement) {
                    setPlantInfo(null)
                } else {
                    setPlantInfo({
                        origin: "Hanagotchi",
                        info: measurement,
                    });
                }
            } catch (e) {
                try {
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
                        });
                    }
                } catch (e) {
                    setError(e as Error);
                } 
            } finally {
                setIsFetching(false);
            }

        }
        fetchInfo();
    }, [plant]);

    return {
        plantInfo,
        error,
        isFetching,
    }
}