import {ActivityIndicator, SafeAreaView, StyleSheet, View} from "react-native"
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from "../navigation/Navigator";
import LoaderButton from "../components/LoaderButton";
import React, {useEffect, useState} from "react";
import {BACKGROUND_COLOR, BROWN_DARK, RED} from "../themes/globalThemes";
import TextInput from "../components/TextInput";
import SelectBox from "../components/SelectBox";
import {useHanagotchiApi} from "../hooks/useHanagotchiApi";
import {useApiFetch} from "../hooks/useApiFetch";
import { useSession } from "../hooks/useSession";
import { AxiosError } from "axios";
import { Text } from "react-native-paper";

interface SelectOption {
    key: number;
    value: string;
}

type AddSensorProps = NativeStackScreenProps<RootStackParamsList, "AddSensor">;

const AddSensorScreen: React.FC<AddSensorProps> = ({navigation}) => {
    const api = useHanagotchiApi();
    const userId = useSession((state) => state.session?.userId)!;
    const [plantOptions, setPlantOptions] = useState<SelectOption[]>([]);
    const [option, setOption] = useState(0);
    const [serialNumber, setSerialNumber] = useState("");
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const {isFetching: isFetchingPlant, fetchedData: plants} = useApiFetch(
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

    const createSensor = async () => {
        if (option.toString() == "---" || serialNumber == "") return
        try {
            await api.addSensor(serialNumber, option);
            navigation.goBack();
        } catch (e) {
            console.log((e as AxiosError).response?.status);
            if ((e as AxiosError).response?.status === 400) {
                setErrorMsg("El numero de serie indicado ya se encuentra asociado a una planta existente.");
            }
        }

    }

    useEffect(() => {
        if (option.toString() == "---" || serialNumber == "") {
            setIsButtonEnabled(false)
            return
        }
        setIsButtonEnabled(true)
    }, [option, serialNumber]);


    useEffect(() => {
        if (plants && plants.length > 0) {
            const filteredPlants = plants.filter((plant) => !devicePlants.some((it) => it.id_plant === plant.id));
            const updatedPlants = filteredPlants.map(plant => ({
                key: plant.id,
                value: plant.name
            }));
            if (updatedPlants.length === 0) {
                console.log(updatedPlants);
                setErrorMsg("No tiene plantas a las cuales puedas asociarle un sensor nuevo. ¡Ve y crea nuevas plantas!")
            } else {
                setErrorMsg("");
            }
            setPlantOptions(updatedPlants);
        }
    }, [devicePlants, plants]);

    return <SafeAreaView style={style.container}>
        {(isFetchingPlant || isFetchingDevices) ? <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={{justifyContent: "center", flexGrow: 1}}/> :
            <>
                <TextInput label={`NUMERO DE SERIE`} value={serialNumber} onChangeText={(text) => setSerialNumber(text)} />
                {plantOptions.length > 0 && <SelectBox
                    label="PLANTA"
                    data={plantOptions}
                    setSelected={(option) => setOption(option)}
                    save="key"
                    defaultOption={{ key: "---", value: "---" }}
                />}
                <Text style={style.errorText}>{errorMsg}</Text>
                <View style={style.buttonContainer}>
                    <LoaderButton
                        mode="contained"
                        uppercase style={style.button}
                        onPress={() => createSensor()}
                        labelStyle={{fontSize: 17}}
                        disabled={!isButtonEnabled}
                    >
                        Asociar
                    </LoaderButton>
                </View>
            </>
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
    errorText: {
        color: RED,
        textAlign: "center",
        width: "80%"
    }
})

export default AddSensorScreen;