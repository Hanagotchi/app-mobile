import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, View } from "react-native"
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from "../navigation/Navigator";
import LoaderButton from "../components/LoaderButton";
import { useEffect, useState } from "react";
import { BACKGROUND_COLOR, BROWN_DARK } from "../themes/globalThemes";
import TextInput from "../components/TextInput";
import SelectBox from "../components/SelectBox";
import { useHanagotchiApi } from "../hooks/useHanagotchiApi";
import { useApiFetch } from "../hooks/useApiFetch";
import { useSession } from "../hooks/useSession";
import { Image } from "react-native";
import { Text } from "react-native-paper";
import { PlantType } from "../models/PlantType";

const NAME_MAX_LENGTH = 32;

type AddPlantProps = NativeStackScreenProps<RootStackParamsList, "AddPlant">;

interface SelectOption {
    key: string;
    value: string;

}

const AddPlantScreen: React.FC<AddPlantProps> = ({ navigation }) => {
    const api = useHanagotchiApi();
    const userId = useSession((state) => state.session?.userId)!;
    const [types, setTypes] = useState<SelectOption[]>([]);
    const [name, setName] = useState("");
    const [plantSelected, setPlantSelected] = useState<PlantType | null>();
    const [isButtonEnabled, setIsButtonEnabled] = useState(false)

    const { isFetching, fetchedData: plantTypes } = useApiFetch(
        () => api.getPlantTypes(),
        [{
            id: 0,
            botanical_name: "",
            common_name: "",
            description: "",
            photo_link: "",
        }]
    );
    const createPlant = async () => {
        await api.createPlant(userId, name, plantSelected!.botanical_name);
        navigation.goBack();
    }

    const handleSetCommonName = (option: string) => {
        setPlantSelected(plantTypes.find(plant => plant.common_name == option));
    }
    useEffect(() => {
        if (plantSelected === null || name == "") {
            setIsButtonEnabled(false)
            return
        }
        setIsButtonEnabled(true)
    }, [plantSelected, name]);

    useEffect(() => {
        if (plantTypes && plantTypes.length > 0) {
            const updatedTypes = plantTypes.map(plant => ({
                key: plant.common_name,
                value: plant.common_name,
            }));
            setTypes(updatedTypes);
        }
    }, [plantTypes]);

    return <SafeAreaView style={style.safeArea}>
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }} keyboardShouldPersistTaps="handled">
        <View style={style.container}>

                {isFetching ? <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={{ justifyContent: "center", flexGrow: 1 }} /> :
                    <>
                        <TextInput label={`NOMBRE ${name.length}/${NAME_MAX_LENGTH} *`} maxLenght={NAME_MAX_LENGTH} value={name} onChangeText={(text) => setName(text)} />
                        <SelectBox
                            label="TIPO DE PLANTA"
                            data={types}
                            setSelected={(option) => handleSetCommonName(option)}
                            save="key"
                            defaultOption={undefined}
                        />
                        {plantSelected ?
                            <>
                                <Text style={{ ...style.plantDescription, fontWeight: "bold" }}>{plantSelected.botanical_name}</Text>
                                <Image style={style.imageDescription} source={{ uri: plantSelected.photo_link }} />
                                <Text style={{ ...style.plantDescription, width: "80%", }}>{plantSelected.description}</Text>
                            </> : null

                        }
                    </>
                }
                <LoaderButton
                    mode="contained"
                    uppercase style={style.button}
                    onPress={() => createPlant()}
                    labelStyle={{ fontSize: 17 }}
                    disabled={!isButtonEnabled}
                >
                    Crear
                </LoaderButton>
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
    plantDescription: {
        fontSize: 15,
        fontFamily: "IBMPlexMono_Italic",
        textAlign: 'center',
        color: '#4F4C4F',
    },
    imageDescription: {
        borderRadius: 10,
        width: 200,
        height: 200
    },
})

export default AddPlantScreen;