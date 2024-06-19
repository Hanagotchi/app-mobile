import { useEffect, useState } from "react";
import { Plant } from "../models/Plant";
import useMyUser from "./useMyUser";
import { useHanagotchiApi } from "./useHanagotchiApi";
import { useOpenWeatherApi } from "./useOpenWeatherApi";
import { InfoToShow } from "../models/InfoToShow";
import { DevicePlant } from "../models/DevicePlant";

export const usePlantInfo = (plant: Plant) => {
    const [plantInfo, setPlantInfo] = useState<InfoToShow | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [device, setDevice] = useState<DevicePlant>();
    const {myUser} = useMyUser();
    const hanagotchiApi = useHanagotchiApi();
    const openWeatherApi = useOpenWeatherApi();
    
    const [tick, setTick] = useState<boolean>(false);
    const refresh = () => setTick(t => !t);

    useEffect(() => {
        const fetchInfo = async () => {
            setIsFetching(true);
            setDevice(undefined);
            const devicePlant = await hanagotchiApi.getDevicePlants({id_plant: plant.id});
            console.log(devicePlant);
            if (devicePlant) {
                setDevice(devicePlant as DevicePlant)
                const measurement = await hanagotchiApi.getLastMeasurement(plant.id);
                if (!measurement) {
                    setPlantInfo(null)
                } else {
                    setPlantInfo({
                        origin: "Hanagotchi",
                        info: measurement,
                    });
                }
            } else {
                try {
                    if (myUser?.location) {
                        const weatherData = await openWeatherApi.getCurrentWeather(myUser.location.lat!, myUser.location.long!)
                        const timestamp = new Date(0);
                        timestamp.setUTCSeconds(weatherData.dt);
                        setPlantInfo({
                            origin: "OpenWeather",
                            info: {
                                temperature: Number((weatherData.main.temp - 273.15).toFixed(1)),
                                humidity: weatherData.main.humidity,
                                time_stamp: timestamp,
                            }
                        });
                    }
                } catch (e) {
                    setError(e as Error);
                } 
            }

            setIsFetching(false);
        }
        fetchInfo();
    }, [plant, myUser, tick]);

    return {
        plantInfo,
        error,
        isFetching,
        device,
        refresh,
    }
}