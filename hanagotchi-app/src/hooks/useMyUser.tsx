import { useHanagotchiApi } from "./useHanagotchiApi";
import { useApiFetch } from "./useApiFetch";
import { User } from "../models/User";
import { useSession } from "./useSession";

const useMyUser = () => {
    const userId = useSession((state) => state.session!.userId);

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