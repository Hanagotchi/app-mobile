import { useHanagotchiApi } from "./useHanagotchiApi";
import { UserProfile } from "../models/User";
import { useSession } from "./useSession";
import { useFocusApiFetch } from "./useFocusApiFetch";

const useMyProfile = () => {
    const userId = useSession((state) => state.session!.userId);

    const api = useHanagotchiApi();

    const {isFetching, fetchedData, error} = useFocusApiFetch<UserProfile | null>(
        () => api.getUserProfile(userId),
        null,
    );


    return {
        isFetchingMyProfile: isFetching,
        myProfile: fetchedData,
        fetchingMyProfileError: error,
    }
}

export default useMyProfile;