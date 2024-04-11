
import * as SecureStore from "expo-secure-store";
import { useHanagotchiApi } from "./useHanagotchiApi";
import { useFocusApiFetch } from "./useFocusApiFetch";
import { Plant } from "../models/Plant";

export const useMyPlants = () => {
    const userId = Number(SecureStore.getItem("userId"))

    const api = useHanagotchiApi();

    const {isFetching, fetchedData, error} = useFocusApiFetch<Plant[]>(
        () => api.getPlants({id_user: userId}),
        [],
    );

    return {
        isFetchingPlants: isFetching,
        myPlants: fetchedData,
        fetchingPlantsError: error,
    }
}