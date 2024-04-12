import * as SecureStore from "expo-secure-store";
import { useHanagotchiApi } from "./useHanagotchiApi";
import { useApiFetch } from "./useApiFetch";
import { User } from "../models/User";

const useMyUser = () => {
    const userId = Number(SecureStore.getItem("userId"))

    const api = useHanagotchiApi();

    const {isFetching, fetchedData, error} = useApiFetch<User | null>(
        () => api.getUser(userId),
        null,
    );

    return {
        isFetchingMyUser: isFetching,
        myUser: fetchedData,
        fetchingMyUserError: error,
    }
}

export default useMyUser;