import { SafeAreaView, StyleSheet, Text } from "react-native"
import useAuth from "../hooks/useAuth";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamsList, RootStackParamsList } from "../navigation/Navigator";
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import * as SecureStore from "expo-secure-store";
import LoaderButton from "../components/LoaderButton";
import { useState } from "react";
import { BACKGROUND_COLOR, BEIGE, BROWN_DARK, BROWN_LIGHT } from "../themes/globalThemes";
import TextInput from "../components/TextInput";


type SettingsScreenProps = CompositeScreenProps<
    BottomTabScreenProps<MainTabParamsList, "Settings">,
    NativeStackScreenProps<RootStackParamsList>
>;

const SettingsScreen: React.FC<SettingsScreenProps> = ({navigation}) => {
    const {signOut} = useAuth();
    //const user = JSON.parse(SecureStore.getItem("user")!);
    
    const [text, setText] = useState("");

    const handleSignOut = async () => {
        await signOut();
        navigation.navigate("Login");
    }

    return <SafeAreaView style={style.container}>
        {/* <Text>{`Usuario: ${user.email ?? null}`}</Text> */}
        <TextInput label="NOMBRE" value={text} onChangeText={(text) => setText(text)}/>
        <LoaderButton 
            mode="contained" 
            uppercase style={style.button} 
            onPress={handleSignOut}
            labelStyle={{fontSize: 17}}
        >
            Cerrar sesión
        </LoaderButton>
    </SafeAreaView>
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: "center",
        paddingBottom: 20,
        gap: 10,
        backgroundColor: BACKGROUND_COLOR,
    },
    button: {
        borderRadius: 10,
        width: "50%",
        height: 50,
        justifyContent: "center",
    },
    card: {
        backgroundColor: BEIGE,
        width: "80%",
        gap: 0,
        columnGap: 0,
    },
    cardTitle: {
        color: BROWN_LIGHT,
        fontSize: 12,
    }
})

export default SettingsScreen;