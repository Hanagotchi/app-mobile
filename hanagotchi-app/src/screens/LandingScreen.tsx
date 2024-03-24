import { SafeAreaView, StyleSheet, Text } from "react-native"
import { Button } from "react-native-paper";
import useAuth from "../hooks/useAuth";

const LandingScreen: React.FC = ({navigation}) => {
    const {signOut} = useAuth();

    const handleSignOut = async () => {
        await signOut();
        navigation.navigate("Login");
    }

    return <SafeAreaView>
        <Text>Holaaaa</Text>
        <Button 
            mode="contained" 
            uppercase style={style.button} 
            onPress={handleSignOut}
            labelStyle={{fontSize: 17}}
        >
            Cerrar sesión
        </Button>
    </SafeAreaView>
}

const style = StyleSheet.create({
    button: {
        borderRadius: 10,
        width: "50%",
        height: 50,
        justifyContent: "center",
    },
})

export default LandingScreen;