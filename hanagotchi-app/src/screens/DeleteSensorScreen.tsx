import {ActivityIndicator, SafeAreaView, StyleSheet, View} from "react-native"
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from "../navigation/Navigator";
import LoaderButton from "../components/LoaderButton";
import React, {useEffect, useState} from "react";
import {BACKGROUND_COLOR, BROWN_DARK} from "../themes/globalThemes";
import SelectBox from "../components/SelectBox";
import {useHanagotchiApi} from "../hooks/useHanagotchiApi";
import {useApiFetch} from "../hooks/useApiFetch";
import { useSession } from "../hooks/useSession";

interface SelectOption {
    key: number;
    value: string;
}

type DeleteSensorProps = NativeStackScreenProps<RootStackParamsList, "DeleteSensor">;

const DeleteSensorScreen: React.FC<DeleteSensorProps> = ({navigation}) => {
    const api = useHanagotchiApi();
    const userId = useSession((state) => state.session?.userId)!;
    const [plantOptions, setPlantOptions] = useState<SelectOption[]>([]);
    const[option, setOption] = useState(0);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false)
    const {isFetching: isFetchingPlants, fetchedData: plants} = useApiFetch(
        () => api.getPlants({id_user: userId}),
        [{
            id: 0,
            id_user: 0,
            name: "",
            scientific_name: "",
        }]
    );

    const {isFetching: isFetchingDevices, fetchedData: devicePlants} = useApiFetch(
        () => api.getDevicePlants(),
        [{
            id_user: 0,
            id_device: "",
            id_plant: 0,
            plant_type: "",
        }]
    );

    useEffect(() => {
        if (option.toString() == "---") {
            setIsButtonEnabled(false)
            return
        }
        setIsButtonEnabled(true)
    }, [option]);

    const deleteDevice = async () => {
        if (option.toString() == "---") return
        await api.deleteDevice(option);
        navigation.goBack();
    }

    useEffect(() => {
        if (plants && plants.length > 0) {
            const filteredPlants = plants.filter((plant) => devicePlants.some((it) => it.id_plant === plant.id));
            const updatedPlants = filteredPlants.map(plant => ({
                key: plant.id,
                value: plant.name
            }));
            setPlantOptions(updatedPlants);
        }
    }, [plants, devicePlants]);

    return <SafeAreaView style={style.container}>
        {(isFetchingPlants || isFetchingDevices) ? ( <ActivityIndicator animating={true} color={BROWN_DARK} size={80}/>) :
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
                        disabled={!isButtonEnabled}
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
        paddingTop: 40,
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