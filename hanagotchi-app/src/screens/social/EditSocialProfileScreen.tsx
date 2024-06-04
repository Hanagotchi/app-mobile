import { StyleSheet, SafeAreaView } from "react-native"
import { theme } from "../../themes/globalThemes";
import { useHanagotchiApi } from "../../hooks/useHanagotchiApi";
import { UserProfile } from "../../models/User";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../../navigation/Navigator";
import EditProfile from "../../components/social/posts/EditProfile";

type EditSocialProfileScreenProps = NativeStackScreenProps<RootStackParamsList, "EditSocialProfile">;

const EditSocialProfileScreen: React.FC<EditSocialProfileScreenProps> = ({ route, navigation }) => {
    const { socialProfile } = route.params;
    const api = useHanagotchiApi();

    const onEditProfile = async (socialProfileToUpdate: UserProfile) => {
        await api.patchUser({...socialProfileToUpdate});
    }

    const onSubmiteComplete = () => {
        navigation.goBack();
    }

    return <>
        <SafeAreaView style={style.container}>
            <EditProfile initValues={socialProfile} onSubmit={onEditProfile} onSubmiteComplete={onSubmiteComplete} />
        </SafeAreaView>
    </>

}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 30,
        alignItems: "center",
        gap: 20,
        backgroundColor: theme.colors.background,
    },
    profile: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: "7.5%",
    },
});

export default EditSocialProfileScreen;