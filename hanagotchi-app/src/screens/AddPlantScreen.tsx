import {ActivityIndicator, SafeAreaView, StyleSheet, View} from "react-native"
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from "../navigation/Navigator";
import LoaderButton from "../components/LoaderButton";
import {useEffect, useState} from "react";
import {BACKGROUND_COLOR, BROWN_DARK} from "../themes/globalThemes";
import TextInput from "../components/TextInput";
import SelectBox from "../components/SelectBox";
import {useHanagotchiApi} from "../hooks/useHanagotchiApi";
import {useApiFetch} from "../hooks/useApiFetch";
import { useSession } from "../hooks/useSession";


type AddPlantProps = NativeStackScreenProps<RootStackParamsList, "AddPlant">;

interface SelectOption {
    key: string;
    value: string;
}

const AddPlantScreen: React.FC<AddPlantProps> = ({navigation}) => {
    const api = useHanagotchiApi();
    const userId = useSession((state) => state.session?.userId)!;
    const [types, setTypes] = useState<SelectOption[]>([]);
    const[name, setName] = useState("");
    const[option, setOption] = useState("");
    const [isButtonEnabled, setIsButtonEnabled] = useState(false)

    const {isFetching, fetchedData: plantTypes} = useApiFetch(
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
        await api.createPlant(userId, name, option);
        navigation.goBack();
    }

    useEffect(() => {
        if (option.toString() == "---" || name == "") {
            setIsButtonEnabled(false)
            return
        }
        setIsButtonEnabled(true)
    }, [option, name]);

    useEffect(() => {
        if (plantTypes && plantTypes.length > 0) {
            const updatedTypes = plantTypes.map(plant => ({
                key: plant.botanical_name,
                value: plant.botanical_name
            }));
            setTypes(updatedTypes);
        }
    }, [plantTypes]);

    return <SafeAreaView style={style.container}>
        {isFetching ? <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={{justifyContent: "center", flexGrow: 1}}/> :
            <>
                <TextInput label={`NOMBRE`} value={name} onChangeText={(text) => setName(text)} />
                <SelectBox
                        label="TIPO DE PLANTA"
                        data={types}
                        setSelected={(option) => setOption(option)}
                        save="key"
                        defaultOption={{ key: "---", value: "---" }}
                    />
                <View style={style.buttonContainer}>
                    <LoaderButton
                        mode="contained"
                        uppercase style={style.button}
                        onPress={() => createPlant()}
                        labelStyle={{fontSize: 17}}
                        disabled={!isButtonEnabled}
                    >
                        Crear
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
})

export default AddPlantScreen;