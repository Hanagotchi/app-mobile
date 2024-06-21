import {ActivityIndicator, SafeAreaView, StyleSheet, View} from "react-native"
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from "../navigation/Navigator";
import LoaderButton from "../components/LoaderButton";
import React, {useEffect, useRef, useState} from "react";
import {BACKGROUND_COLOR, BROWN_DARK, RED} from "../themes/globalThemes";
import SelectBox from "../components/SelectBox";
import {useHanagotchiApi} from "../hooks/useHanagotchiApi";
import {useApiFetch} from "../hooks/useApiFetch";
import { useSession } from "../hooks/useSession";
import Dialog, { DialogRef } from "../components/Dialog";
import {Text} from "react-native-paper";

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
    const dialogRef = useRef<DialogRef>(null);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const {isFetching: isFetchingPlants, fetchedData: plants} = useApiFetch(
        () => api.getPlants(),
        [{
            id: 0,
            id_user: 0,
            name: "",
            scientific_name: "",
        }]
    );

    const {isFetching: isFetchingDevices, fetchedData: devicePlants} = useApiFetch(
        () => api.getDevicePlants({limit: 50}),
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

    const askForConfirmation = () => {
        if (option.toString() == "---") return;
        dialogRef.current?.showDialog();
    }

    const deleteDevice = async () => {
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

            if (updatedPlants.length === 0) {
                console.log(updatedPlants);
                setErrorMsg("No tienes ningun sensor asociado a alguna planta")
            } else {
                setErrorMsg("");
            }

            setPlantOptions(updatedPlants);
        }
    }, [plants, devicePlants]);

    return <SafeAreaView style={style.container}>
        {(isFetchingPlants || isFetchingDevices) ? ( <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={{justifyContent: "center", flexGrow: 1}}/>) :
            (<>
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
                        onPress={() => askForConfirmation()}
                        labelStyle={{fontSize: 17}}
                        disabled={!isButtonEnabled}
                    >
                        Eliminar
                    </LoaderButton>
                </View>
                <Dialog
                    ref={dialogRef}
                    title="¿Desea desasociar este sensor?"
                    content={`Una vez eliminado, ${plantOptions.filter(p => p.key === option)[0]?.value} no recibirá mas mediciones del sensor. Sin embargo, aun podra recibir datos del clima local.`}
                    primaryButtonProps={{
                        onPress: () => {
                            dialogRef.current?.hideDialog();
                            deleteDevice();
                        },
                    }}
                    secondaryButtonProps={{
                        onPress: () => dialogRef.current?.hideDialog(),
                    }} 
                children={undefined}
                />
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
    errorText: {
        color: RED,
        textAlign: "center",
        width: "80%"
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