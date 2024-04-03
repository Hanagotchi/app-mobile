import { View, StyleSheet, SafeAreaView, ImageBackground } from "react-native";
import { Text, useTheme } from 'react-native-paper';
import loginBackground from "../assets/loginBackground.png";
import { BROWN_LIGHT } from "../themes/globalThemes";
import useAuth from "../hooks/useAuth";
import { MainTabParamsList, RootStackParamsList } from "../navigation/Navigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { handleError } from "../common/errorHandling";
import LoaderButton from "../components/LoaderButton";
import { statusCodes } from "@react-native-google-signin/google-signin";
import { User } from "../models/User";

//type LoginScreenProps = NativeStackScreenProps<RootStackParamsList, "Login">
type LoginScreenProps = CompositeScreenProps<
    NativeStackScreenProps<RootStackParamsList, "Login">,
    BottomTabScreenProps<MainTabParamsList>
>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const theme = useTheme();
    const { signIn } = useAuth();

    const handleSignIn = async () => {
        try {
            const user: User = await signIn();
            if (!user.gender) {//|| !user.location) {
                navigation.navigate("CompleteLogin", { userId: user.id });
            } else {
                navigation.navigate("Home", { bgColor: "blue" });
            } 

        } catch (err: any) {
            if (err.code === statusCodes.SIGN_IN_CANCELLED) return;
            handleError(err as Error);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <View style={style.container}>
                <View>
                    <Text style={{ ...style.title, color: theme.colors.onSecondary }}>HANAGOTCHI</Text>
                    <Text style={{ ...style.subtitle, color: BROWN_LIGHT }}>Tu nuevo mejor amigo</Text>
                </View>
                <ImageBackground source={loginBackground} style={style.background} />
                <LoaderButton
                    mode="contained"
                    uppercase style={style.button}
                    onPress={handleSignIn}
                    labelStyle={{ fontSize: 17 }}
                >
                    Iniciar sesión
                </LoaderButton>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        gap: 40,
        marginTop: 35,
    },
    background: {
        width: 400,
        height: 400,
    },
    header: {
        position: "absolute",
        top: 100,
        width: "100%",
        alignItems: "center",
    },
    footer: {
        position: "absolute",
        bottom: 50,
        width: "100%",
        alignItems: "center",
    },
    title: {
        fontSize: 45,
        fontFamily: "IBMPlexMono_Italic",
        textAlign: 'center',
        fontWeight: "bold"
    },
    subtitle: {
        fontSize: 30,
        fontFamily: "IBMPlexMono_Italic",
        textAlign: 'center',
        fontStyle: "italic",
    },
    button: {
        borderRadius: 10,
        width: "50%",
        height: 50,
        justifyContent: "center",
    },
})

export default LoginScreen;