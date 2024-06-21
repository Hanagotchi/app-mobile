import {ActivityIndicator, SafeAreaView, StyleSheet, View} from "react-native"
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from "../navigation/Navigator";
import LoaderButton from "../components/LoaderButton";
import {useEffect, useRef, useState} from "react";
import {BACKGROUND_COLOR, BROWN_DARK} from "../themes/globalThemes";
import SelectBox from "../components/SelectBox";
import {useHanagotchiApi} from "../hooks/useHanagotchiApi";
import {useApiFetch} from "../hooks/useApiFetch";
import { useSession } from "../hooks/useSession";
import ConfirmBackpressDialog from "../components/ConfirmBackpressDialog";
import Dialog, { DialogRef } from "../components/Dialog";

interface SelectOption {
    key: number;
    value: string;
}

type DeletePlantProps = NativeStackScreenProps<RootStackParamsList, "DeletePlant">;

const DeletePlantScreen: React.FC<DeletePlantProps> = ({navigation}) => {
    const api = useHanagotchiApi();
    const userId = useSession((state) => state.session?.userId)!;
    const [plantOptions, setPlantOptions] = useState<SelectOption[]>([]);
    const[option, setOption] = useState(0);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false)
    const dialogRef = useRef<DialogRef>(null);

    const {isFetching, fetchedData: plants} = useApiFetch(
        () => api.getPlants(),
        [{
            id: 0,
            id_user: 0,
            name: "",
            scientific_name: "",
        }]
    );
    useEffect(() => {
        if (option.toString() == "---") {
            setIsButtonEnabled(false)
            return
        }
        setIsButtonEnabled(true)
    }, [option]);

    useEffect(() => {
        if (plants && plants.length > 0) {
            const updatedPlants = plants.map(plant => ({
                key: plant.id,
                value: plant.name
            }));
            setPlantOptions(updatedPlants);
        }
    }, [plants]);

    const askForConfirmation = () => {
        if (option == 0) return
        dialogRef.current?.showDialog();
    }

    const deletePlant = async () => {
        await api.deletePlant(option);
        navigation.goBack();
    }

    return <SafeAreaView style={style.container}>
        {isFetching ? ( <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={{justifyContent: "center", flexGrow: 1}}/>) :
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
                        onPress={() => askForConfirmation()}
                        labelStyle={{fontSize: 17}}
                        disabled={!isButtonEnabled}
                    >
                        Eliminar
                    </LoaderButton>
                </View>
                <Dialog
                    ref={dialogRef}
                    title="¿Desea eliminar esta planta?"
                    content="Una vez eliminada no se podran recuperar los datos."
                    primaryButtonProps={{
                        onPress: () => {
                            dialogRef.current?.hideDialog();
                            deletePlant();
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

export default DeletePlantScreen;