
import { useHanagotchiApi } from "./useHanagotchiApi";
import { useFocusApiFetch } from "./useFocusApiFetch";
import { Plant } from "../models/Plant";
import { useSession } from "./useSession";

export const useMyPlants = () => {
    const userId = useSession((state) => state.session?.userId)!;

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