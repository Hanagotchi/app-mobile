import { SafeAreaView, StyleSheet, View } from "react-native"
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from "../navigation/Navigator";
import LoaderButton from "../components/LoaderButton";
import { useState } from "react";
import { BACKGROUND_COLOR, BEIGE, BROWN_LIGHT } from "../themes/globalThemes";
import TextInput from "../components/TextInput";
import SelectBox from "../components/SelectBox";
import { Plant } from "../models/Plant"
import { PlantType } from "../models/PlantType"


type AddPlantProps = NativeStackScreenProps<RootStackParamsList, "AddPlant">;

const AddPlantScreen: React.FC<AddPlantProps> = ({navigation}) => {
    const types = [
        { key: "tipo_1", value: "tipo_1" },
        { key: "tipo_2", value: "tipo_2" },
        { key: "tipo_n", value: "tipo_n" },
    ];
    // const types = plantList.map(plant => ({
    //     key: plant.common_name,
    //     value: plant.common_name
    //   }));
    const[name, setName] = useState("");
    const[type, setType] = useState("");
    const[plantTypes, setPlantTypes] = useState<PlantType[]>([]);

    console.log(name);
    return <SafeAreaView style={style.container}>
        <TextInput label={`NOMBRE`} value={name} onChangeText={(text) => setName(text)} />
        <SelectBox
                label="TIPO DE PLANTA"
                data={types}
                setSelected={(option) => setType(option)}
                save="key"
                defaultOption={{ key: "---", value: "---" }}
            />
        <View style={style.buttonContainer}>
            <LoaderButton 
                mode="contained" 
                uppercase style={style.button} 
                onPress={() => navigation.navigate("AddPlant")}
                labelStyle={{fontSize: 17}}
            >
                Crear
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