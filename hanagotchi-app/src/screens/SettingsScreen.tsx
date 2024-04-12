import { SafeAreaView, StyleSheet, View, Text } from "react-native"
import useAuth from "../hooks/useAuth";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamsList, RootStackParamsList } from "../navigation/Navigator";
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import LoaderButton from "../components/LoaderButton";
import { Icon } from 'react-native-paper';
import chevronRight from "../assets/chevron_right.png"
import { useEffect, useState } from "react";
import { BACKGROUND_COLOR, BEIGE, BROWN_LIGHT } from "../themes/globalThemes";
import TextInput from "../components/TextInput";


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

    return <SafeAreaView style={style.container}>
        <View style={style.items}>
            <View style={style.item}>
                <Text style={style.text}>Agregar planta</Text>
                <Icon source={chevronRight} size={23}/>
            </View>
        </View>
    
        <View style={style.buttonContainer}>
            <LoaderButton 
                mode="contained" 
                uppercase style={style.button} 
                onPress={handleSignOut}
                labelStyle={{fontSize: 17}}
            >
                Cerrar sesión
            </LoaderButton>
        </View>
    </SafeAreaView>
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'flex-end',
        alignItems: "center",
        paddingTop: 80,
        // paddingBottom: 20,
        // gap: 10,
        backgroundColor: BACKGROUND_COLOR,
    },
    buttonContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 20,
    },
    button: {
        borderRadius: 10,
        width: "50%",
        height: 50,
        justifyContent: "center",
    },
    items: {
        
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "flex-start",
    },
    item: {
        padding: 15,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
    },
})

export default SettingsScreen;