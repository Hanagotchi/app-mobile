import { StyleSheet, SafeAreaView, ActivityIndicator, View } from "react-native"
import { BACKGROUND_COLOR, BROWN_DARK, BROWN_LIGHT, GREEN } from "../../themes/globalThemes";
import { CompositeScreenProps } from "@react-navigation/native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { SocialDrawerList, SocialDrawerProps } from "../../navigation/social/SocialDrawer";
import { useHanagotchiApi } from "../../hooks/useHanagotchiApi";
import { useFocusApiFetch } from "../../hooks/useFocusApiFetch";
import ProfileDetails from "../../components/social/posts/ProfileDetails";
import PostList from "../../components/social/posts/PostList";
import { PostAuthor } from "../../models/Post";
import { FAB } from "react-native-paper";
import useMyProfile from "../../hooks/useMyProfile";

type SocialProfileScreenProps = CompositeScreenProps<
    DrawerScreenProps<SocialDrawerList, "SocialProfile">,
    SocialDrawerProps
>;

const SocialProfileScreen: React.FC<SocialProfileScreenProps> = ({ route, navigation, }) => {
    const profileId = route.params.profileId;
    const api = useHanagotchiApi();

    const { isFetching: isFetchingProfile, fetchedData: profile, error } = useFocusApiFetch(() => api.getUserProfile(profileId), null, [profileId]);
    const { isFetchingMyProfile, myProfile } = useMyProfile();
    if (error) {
        throw error
    };

    if (isFetchingProfile || !profile || isFetchingMyProfile || !myProfile) {
        return <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
            <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={{ justifyContent: "center", flexGrow: 1 }} />
        </SafeAreaView>
    }

    const handleAddNewPost = () => navigation.navigate("CreatePost");

    const handleRedirectToDetails = (postId: string) => {
        navigation.navigate(
            "PostDetails",
            {postId: postId}
        )
    }

    const onEditProfile = () => {
        navigation.navigate("EditSocialProfile", { socialProfile: profile });
    }

    const onPressFollow = async (userId: number) => {
        if (route.params.handleFollowUser){
            await route.params.handleFollowUser(userId);
        }
        await api.followUser(userId);
    }

    const onPressUnFollow = async (userId: number) => {
        if (route.params.handleUnfollowUser) {
            route.params.handleUnfollowUser(userId);
        } 
        await api.unfollowUser(userId);
    }

    return <>
        <SafeAreaView style={style.container}>
            <ProfileDetails profile={profile} myProfile={myProfile} onPressFollow={onPressFollow} onPressUnFollow={onPressUnFollow} onEditProfile={onEditProfile} />
            <View style={{ height: 3, backgroundColor: BROWN_LIGHT, marginVertical: 20, opacity: 0.3 }} />
            <View style={style.posts}>
                <PostList
                    updatePosts={(pageNum: number) => api.getAllPostsOfUser(profileId, pageNum, 10)}
                    myId={profileId}
                    onRedirectToProfile={(author: PostAuthor) => { }}
                    onRedirectToDetails={handleRedirectToDetails}
                />
                {profileId === myProfile._id &&
                    <FAB
                        icon={"plus"}
                        mode="flat"
                        style={style.fab}
                        variant="primary"
                        size="medium"
                        color={BACKGROUND_COLOR}
                        onPress={handleAddNewPost}
                    />}
            </View>
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
    posts: {
        flex: 2,
        justifyContent: 'center',
        alignItems: "center",
        paddingHorizontal: "5%",
        gap: 10,
        backgroundColor: BACKGROUND_COLOR,
    },
    fab: {
        bottom: "4%",
        right: "8%",
        position: 'absolute',
        backgroundColor: GREEN,
        color: BACKGROUND_COLOR,
        borderRadius: 30,
    }
});

export default SocialProfileScreen;