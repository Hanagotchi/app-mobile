import { StyleSheet, SafeAreaView } from "react-native"
import { BACKGROUND_COLOR } from "../../themes/globalThemes";
import { Text } from "react-native-paper";
import { CompositeScreenProps } from "@react-navigation/native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { SocialDrawerList } from "../../navigation/social/SocialDrawer";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { MainTabParamsList, RootStackParamsList } from "../../navigation/Navigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type SocialProfileScreenProps = CompositeScreenProps<
        DrawerScreenProps<SocialDrawerList, "SocialProfile">,
        CompositeScreenProps<
            BottomTabScreenProps<MainTabParamsList, "SocialNetwork">,
            NativeStackScreenProps<RootStackParamsList>
        >
    >;

const SocialProfileScreen: React.FC<SocialProfileScreenProps> = ({route}) => {
    const profileId = route.params.profileId;

    return <SafeAreaView style={style.container}>
        <Text>Pantalla de perfil del usuario {profileId}</Text>
    </SafeAreaView>
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        paddingTop: 20,
        paddingHorizontal: "5%",
        gap: 10,
        backgroundColor: BACKGROUND_COLOR,
    },
});

export default SocialProfileScreen;