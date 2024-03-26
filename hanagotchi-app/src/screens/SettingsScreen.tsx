import { SafeAreaView, StyleSheet, Text } from "react-native"
import { Button } from "react-native-paper";
import useAuth from "../hooks/useAuth";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamsList, RootStackParamsList } from "../navigation/Navigator";
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import * as SecureStore from "expo-secure-store";


type SettingsScreenProps = CompositeScreenProps<
    BottomTabScreenProps<MainTabParamsList, "Settings">,
    NativeStackScreenProps<RootStackParamsList>
>;

const SettingsScreen: React.FC<SettingsScreenProps> = ({navigation}) => {
    const {signOut} = useAuth();
    const user = JSON.parse(SecureStore.getItem("user")!);

    const handleSignOut = async () => {
        await signOut();
        navigation.navigate("Login");
    }

    return <SafeAreaView style={style.container}>
        <Text>{`Usuario: ${user.email}`}</Text>
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
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: "center",
        paddingBottom: 20,
    },
    button: {
        borderRadius: 10,
        width: "50%",
        height: 50,
        justifyContent: "center",
    },
})

export default SettingsScreen;