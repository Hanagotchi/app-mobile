import { StyleSheet, SafeAreaView, ActivityIndicator, View  } from "react-native"
import { BACKGROUND_COLOR, BROWN_DARK, BROWN_LIGHT } from "../../themes/globalThemes";
import { CompositeScreenProps } from "@react-navigation/native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { SocialDrawerList, SocialDrawerProps } from "../../navigation/social/SocialDrawer";
import { useHanagotchiApi } from "../../hooks/useHanagotchiApi";
import { useFocusApiFetch } from "../../hooks/useFocusApiFetch";
import ProfileDetails from "../../components/social/posts/ProfileDetails";

type SocialProfileScreenProps = CompositeScreenProps<
    DrawerScreenProps<SocialDrawerList, "SocialProfile">,
    SocialDrawerProps
>;

const SocialProfileScreen: React.FC<SocialProfileScreenProps> = ({ route, navigation,}) => {
    const profileId = route.params.profileId;
    const api = useHanagotchiApi();

    const { isFetching: isFetchingProfile, fetchedData: profile, error } = useFocusApiFetch(() => api.getUserProfile(profileId), null, [profileId]);

    if (error) {
        throw error
    };

    if (isFetchingProfile || !profile) {
        return <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
            <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={{ justifyContent: "center", flexGrow: 1 }} />
        </SafeAreaView>
    }
    
    const onEditProfile = () => {
        navigation.navigate("EditSocialProfile", { socialProfile: profile });
    }

     const onPressFollow = async (userId: number) => {
       await api.followUser(userId);
    }

    const onPressUnFollow = async (userId: number) => {
        await api.unfollowUser(userId);
    }

    return <>
        <SafeAreaView style={style.container}>
            <ProfileDetails profile={profile}  onPressFollow={onPressFollow} onPressUnFollow={onPressUnFollow} onEditProfile={onEditProfile} />
            <View style={{ height: 1, backgroundColor: BROWN_LIGHT, marginVertical: 20, opacity: 0.5 }} />
        </SafeAreaView>
    </>

}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        paddingTop: 20,
    },
    profile: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: "7.5%",
    },
});

export default SocialProfileScreen;