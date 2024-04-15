import {ActivityIndicator, SafeAreaView, StyleSheet, View} from "react-native"
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from "../navigation/Navigator";
import LoaderButton from "../components/LoaderButton";
import {useEffect, useState} from "react";
import {BACKGROUND_COLOR, BROWN_DARK} from "../themes/globalThemes";
import SelectBox from "../components/SelectBox";
import {useHanagotchiApi} from "../hooks/useHanagotchiApi";
import {useApiFetch} from "../hooks/useApiFetch";
import * as SecureStore from "expo-secure-store";

interface SelectOption {
    key: number;
    value: string;
}

type DeleteSensorProps = NativeStackScreenProps<RootStackParamsList, "DeleteSensor">;

const DeleteSensorScreen: React.FC<DeleteSensorProps> = ({navigation}) => {
    const api = useHanagotchiApi();
    const userId = Number(SecureStore.getItem("userId"))
    const [plantOptions, setPlantOptions] = useState<SelectOption[]>([]);
    const[option, setOption] = useState(0);

    const deleteDevice = async () => {
        if (option == 0) return
        await api.deleteDevice(option);
        navigation.goBack();
    }
    const {isFetching, fetchedData: plants} = useApiFetch(
        () => api.getPlants(userId),
        [{
            id: 0,
            id_user: 0,
            name: "",
            scientific_name: "",
        }]
    );

    const {fetchedData: devicePlants} = useApiFetch(
        () => api.getDevicePlants(),
        [{
            id_user: 0,
            id_device: "",
            id_plant: 0,
            plant_type: "",
        }]
    );

    useEffect(() => {
        if (plants && plants.length > 0) {
            const filteredPlants = plants.filter((plant) => devicePlants.some((it) => it.id_plant === plant.id));
            const updatedPlants = filteredPlants.map(plant => ({
                key: plant.id,
                value: plant.name
            }));
            setPlantOptions(updatedPlants);
        }
    }, [plants]);

    return <SafeAreaView style={style.container}>
        {isFetching ? ( <ActivityIndicator animating={true} color={BROWN_DARK} size={80}/>) :
            (<>
                <SelectBox
                    label="PLANTA"
                    data={plantOptions}
                    setSelected={(option) => setOption(option)}
                    save="key"
                    defaultOption={{ key: "---", value: "---" }}
                />
                <View style={style.buttonContainer}>
                    <LoaderButton
                        mode="contained"
                        uppercase style={style.button}
                        onPress={() => deleteDevice()}
                        labelStyle={{fontSize: 17}}
                    >
                        Eliminar
                    </LoaderButton>
                </View>
            </>)
        }
    </SafeAreaView>
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 80,
        backgroundColor: BACKGROUND_COLOR,
        gap: 30,
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

export default DeleteSensorScreen;