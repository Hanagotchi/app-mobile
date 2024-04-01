import {Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native"
import useAuth from "../hooks/useAuth";
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainTabParamsList, RootStackParamsList} from "../navigation/Navigator";
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {CompositeScreenProps} from '@react-navigation/native';
import arrow from "../assets/arrowicon.png";
import LoaderButton from "../components/LoaderButton";
import React from "react";
import {BACKGROUND_COLOR} from "../themes/globalThemes";
import {Icon} from "react-native-paper";


type SettingsScreenProps = CompositeScreenProps<
    BottomTabScreenProps<MainTabParamsList, "Settings">,
    NativeStackScreenProps<RootStackParamsList>
>;

const SettingsScreen: React.FC<SettingsScreenProps> = ({navigation}) => {
    const {signOut} = useAuth();

    const handleSignOut = async () => {
        await signOut();
        navigation.navigate("Login");
    }


    return <SafeAreaView style={style.area}>
        <View style={style.container}>
            <Pressable style={style.option} onPress={()=>navigation.navigate("Profile")}>
                <Text style={style.text}>Editar mis datos</Text>
                <Icon size={40} source={arrow}></Icon>
            </Pressable>
            <View style={style.buttonContainer}>
                <LoaderButton mode="contained" uppercase style={style.button} onPress={handleSignOut} labelStyle={{ fontSize: 17 }}>
                    Cerrar sesión
                </LoaderButton>
            </View>
        </View>
    </SafeAreaView>
}

const style = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        justifyContent: "flex-end"
    },
    container: {
        marginTop: 100,
        padding: 10,
    },
    option: {
        display: "flex",
        flexDirection: "row",
        gap: -5
    },
    button: {
        borderRadius: 10,
        width: "50%",
        height: 50,
        justifyContent: "center",
    },
    text: {
        fontSize: 22,
        fontFamily: "Roboto",
    },
    buttonContainer: {
        alignItems: 'center'
    },
})

export default SettingsScreen;