import { SafeAreaView, StyleSheet, View, Text, Pressable, ActivityIndicator } from "react-native"
import useAuth from "../hooks/useAuth";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamsList, RootStackParamsList } from "../navigation/Navigator";
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import LoaderButton from "../components/LoaderButton";
import { Icon } from 'react-native-paper';
import chevronRight from "../assets/chevron_right.png";
import { BACKGROUND_COLOR, BROWN_DARK } from "../themes/globalThemes";
import { useMyPlants } from "../hooks/useMyPlants";
import { useHanagotchiApi } from "../hooks/useHanagotchiApi";
import { useApiFetch } from "../hooks/useApiFetch";
import { useEffect, useState } from "react";


type SettingsScreenProps = CompositeScreenProps<
    BottomTabScreenProps<MainTabParamsList, "Settings">,
    NativeStackScreenProps<RootStackParamsList>
>;

const SettingsScreen: React.FC<SettingsScreenProps> = ({navigation}) => {
    const {signOut} = useAuth();
    const api = useHanagotchiApi();
    const {myPlants, isFetchingPlants} = useMyPlants();
    const {isFetching: isFetchingDevices, fetchedData: devicePlants} = useApiFetch(
        () => api.getDevicePlants({limit: 50}),
        [],
        [myPlants]
    );
    const [somePlantHasSensor, setSomePlantHasSensor] = useState<boolean>(false);
    const [allPlantsHaveSensor, setAllPlantsHaveSensor] = useState<boolean>(true);

    useEffect(() => {
        if (myPlants && myPlants.length > 0) {
            const filteredPlants = myPlants.filter((plant) => devicePlants!.some((it) => it.id_plant === plant.id));
            setSomePlantHasSensor(filteredPlants.length > 0);
            setAllPlantsHaveSensor(myPlants.length === filteredPlants.length)
        }
    }, [myPlants, devicePlants]);

    const handleSignOut = async () => {
        await signOut();
        navigation.navigate("Login");
    }

    if (isFetchingPlants || isFetchingDevices) {
        return (
          <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
            <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={{ justifyContent: "center", flexGrow: 1 }} />
          </SafeAreaView>
        )
      }

    return <SafeAreaView style={style.container}>
        <View style={style.items}>
            <Pressable style={style.item} onPress={() => navigation.navigate("Profile")}>
                <Text style={style.text}>Editar perfil</Text>
                <Icon source={chevronRight} size={23}/>
            </Pressable>
            <Pressable style={style.item} onPress={() => navigation.navigate("Reminders")}>
                <Text style={style.text}>Mis recordatorios</Text>
                <Icon source={chevronRight} size={23}/>
            </Pressable>
            <Pressable style={style.item} onPress={() => navigation.navigate("AddPlant")}>
                <Text style={style.text}>Agregar planta</Text>
                <Icon source={chevronRight} size={23}/>
            </Pressable>
            {myPlants.length > 0 && <>
                <Pressable style={style.item} onPress={() => navigation.navigate("DeletePlant")}>
                    <Text style={style.text}>Eliminar planta</Text>
                    <Icon source={chevronRight} size={23}/>
                </Pressable>
                {!allPlantsHaveSensor &&
                    <Pressable style={style.item} onPress={() => navigation.navigate("AddSensor")}>
                        <Text style={style.text}>Agregar sensor</Text>
                        <Icon source={chevronRight} size={23}/>
                    </Pressable>
                }
                {somePlantHasSensor && 
                    <Pressable style={style.item} onPress={() => navigation.navigate("DeleteSensor")}>
                        <Text style={style.text}>Eliminar sensor</Text>
                        <Icon source={chevronRight} size={23}/>
                    </Pressable>
                }
            </>
            }
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
        alignItems: "center",
        paddingTop: 80,
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
        alignItems: "center",
    },
})

export default SettingsScreen;