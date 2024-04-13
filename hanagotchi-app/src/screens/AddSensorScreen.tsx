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


type AddSensorProps = NativeStackScreenProps<RootStackParamsList, "AddPlant">;

const AddSensorScreen: React.FC<AddSensorProps> = ({navigation}) => {
    const[serialNumber, setSerialNumber] = useState("");
    // const[plants, setPlants] = useState<Plant[]>([]);
    const plants = [
        { key: "planta_1", value: "planta_1" },
        { key: "planta_2", value: "planta_2" },
        { key: "planta_n", value: "planta_n" },
    ];

    console.log(serialNumber);
    return <SafeAreaView style={style.container}>
        <TextInput label={`NUMERO DE SERIE`} value={serialNumber} onChangeText={(text) => setSerialNumber(text)} />
        <SelectBox
                label="PLANTA"
                data={plants}
                setSelected={(option) => console.log(option)}
                save="key"
                defaultOption={{ key: "---", value: "---" }}
            />
        <View style={style.buttonContainer}>
            <LoaderButton 
                mode="contained" 
                uppercase style={style.button} 
                onPress={() => console.log("Asocia3 !!")}
                labelStyle={{fontSize: 17}}
            >
                Asociar
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

export default AddSensorScreen;