import { StyleSheet, SafeAreaView, ActivityIndicator, View, TouchableOpacity } from "react-native"
import { BACKGROUND_COLOR, BROWN_DARK, BROWN_LIGHT } from "../../themes/globalThemes";
import { Button, Icon, IconButton, Text } from "react-native-paper";
import { CompositeScreenProps } from "@react-navigation/native";
import { DrawerContentScrollView, DrawerScreenProps } from "@react-navigation/drawer";
import { SocialDrawerList, SocialDrawerProps } from "../../navigation/social/SocialDrawer";
import AuthorDetails from "../../components/social/posts/AuthorDetails";
import { useHanagotchiApi } from "../../hooks/useHanagotchiApi";
import { useFocusApiFetch } from "../../hooks/useFocusApiFetch";
import useMyUser from "../../hooks/useMyUser";
import { useApiFetch } from "../../hooks/useApiFetch";
import { UserProfile } from "../../models/User";
import editFill from "../../assets/editFill.png";
import edit from "../../assets/edit.png";

type SocialProfileScreenProps = CompositeScreenProps<
    DrawerScreenProps<SocialDrawerList, "SocialProfile">,
    SocialDrawerProps
>;

const SocialProfileScreen: React.FC<SocialProfileScreenProps> = ({ route }) => {
    const profileId = route.params.profileId;
    const api = useHanagotchiApi();
    const { isFetchingMyUser, myUser } = useMyUser();
    const {
        isFetching: isFetchingUsersProfiles,
        fetchedData: userProfiles,
        error
    } = useApiFetch<UserProfile[]>(() => api.getUsersProfiles({ follower: profileId }), []);

    if (error) {
        throw error
    };

    if (isFetchingMyUser || isFetchingUsersProfiles || !userProfiles || !myUser) {
        return <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
            <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={{ justifyContent: "center", flexGrow: 1 }} />
        </SafeAreaView>
    }

    return <>
        <SafeAreaView style={style.container}>
            <View style={style.profile}>
                <AuthorDetails
                    author={{
                        id: myUser.id,
                        name: myUser.name,
                        photo: myUser.photo,
                        nickname: myUser.nickname,
                    }}

                    onTouch={(me) => console.log(me)}
                />

                {myUser.id === profileId && <TouchableOpacity onPress={() => console.log("Edit profile")}>
                    <Icon size={32} source={editFill} />
                </TouchableOpacity>
                }

            </View>
            <Text style={{ paddingHorizontal: "7.5%", fontSize: 12, color: BROWN_DARK, marginTop: 20, fontStyle: myUser.biography ? "normal" : "italic" }}>
                {myUser.biography ?? "Sin biografía"}
            </Text>

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