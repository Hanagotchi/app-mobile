import { ActivityIndicator, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, View } from "react-native"
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from "../navigation/Navigator";
import LoaderButton from "../components/LoaderButton";
import React, { useEffect, useState } from "react";
import { BACKGROUND_COLOR, BROWN_DARK, RED } from "../themes/globalThemes";
import TextInput from "../components/TextInput";
import SelectBox from "../components/SelectBox";
import { useHanagotchiApi } from "../hooks/useHanagotchiApi";
import { useApiFetch } from "../hooks/useApiFetch";
import { useSession } from "../hooks/useSession";
import { AxiosError } from "axios";
import { Text } from "react-native-paper";

const SERIAL_NUMBER_MAX_LENGTH = 32

interface SelectOption {
    key: number;
    value: string;
}

type AddSensorProps = NativeStackScreenProps<RootStackParamsList, "AddSensor">;

const AddSensorScreen: React.FC<AddSensorProps> = ({ navigation }) => {
    const api = useHanagotchiApi();
    const userId = useSession((state) => state.session?.userId)!;
    const [plantOptions, setPlantOptions] = useState<SelectOption[]>([]);
    const [option, setOption] = useState(0);
    const [serialNumber, setSerialNumber] = useState("");
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const {isFetching: isFetchingPlant, fetchedData: plants} = useApiFetch(
        () => api.getPlants(),
        [{
            id: 0,
            id_user: 0,
            name: "",
            scientific_name: "",
        }]
    );
    const { isFetching: isFetchingDevices, fetchedData: devicePlants } = useApiFetch(
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

    return <SafeAreaView style={style.safeArea}>
                <ScrollView contentContainerStyle={{ paddingBottom: 30 }} keyboardShouldPersistTaps="handled">
                <View style={style.container}>

        {(isFetchingPlant || isFetchingDevices) ? <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={{ justifyContent: "center", flexGrow: 1 }} /> :
            <>
                <TextInput
                    label={`NUMERO DE SERIE ${serialNumber.length}/${SERIAL_NUMBER_MAX_LENGTH} *`}
                    value={serialNumber}
                    maxLenght={SERIAL_NUMBER_MAX_LENGTH}
                    onChangeText={(text) => setSerialNumber(text)}
                />
                {plantOptions.length > 0 && <SelectBox
                    label="PLANTA"
                    data={plantOptions}
                    setSelected={(option) => setOption(option)}
                    save="key"
                    defaultOption={{ key: "---", value: "---" }}
                />}
                {errorMsg !== "" && <Text style={style.errorText}>{errorMsg}</Text>}
                <View style={style.buttonContainer}>

                <Text style={{ ...style.wifiDescription, width: "80%", }}>
                       <Text style={{ fontWeight: "bold", alignContent: "center" }}>{"¡Antes de registrar tu sensor es necesario configurarle su red WiFi!\n\n"}</Text>
                       <Text>{"Para conectarlo a una red WiFi, primero necesitas conectarte a la red:\n\n"}</Text>
                       <Text style={{ fontWeight: "bold" }}>{"WiFi SSID"}</Text>
                       <Text>: Hanagotchi Fallback Hotspot</Text>
                       <Text style={{ fontWeight: "bold" }}>{"\nWiFi Password"}</Text>
                       <Text>: kOHXDFUYLE8K</Text>
                       <Text>{"\n\nUna vez conectado, se te redirigirá a una página donde deberás seleccionar la red WiFi a la que deseas conectar el sensor."}</Text>
                       <Text>{"\n\nSi esto demora o la redirección no sucede de forma automática, se puede abrir de forma manual. En un navegador ingresa la direccion"}</Text>
                       <Text style={{ fontStyle: "italic" }}>{" 192.168.4.1 "}</Text>
                       <Text>{"para seleccionar la red WiFi."}</Text>
                   </Text>



                    <LoaderButton
                        mode="contained"
                        uppercase style={style.button}
                        onPress={() => createSensor()}
                        labelStyle={{ fontSize: 17 }}
                        disabled={!isButtonEnabled}
                    >
                        Asociar
                    </LoaderButton>
                </View>

            </>
        }
</View>
        </ScrollView>
    </SafeAreaView>
}

const style = StyleSheet.create({
    safeArea: {
        flexGrow: 1,
        backgroundColor: BACKGROUND_COLOR,
    },
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
        gap: 30,

        // separados los componentes


    },
    button: {
        borderRadius: 10,
        width: "50%",
        height: 50,
        justifyContent: "center",
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
    },
    wifiDescription: {
        fontSize: 15,
        fontFamily: "IBMPlexMono_Italic",
        textAlign: 'center',
        color: '#4F4C4F',
    },
})

export default AddSensorScreen;