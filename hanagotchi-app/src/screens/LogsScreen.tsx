import { SafeAreaView, StyleSheet, Text } from "react-native"
import useAuth from "../hooks/useAuth";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamsList, RootStackParamsList } from "../navigation/Navigator";
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import LoaderButton from "../components/LoaderButton";
import { useEffect, useState } from "react";
import { BACKGROUND_COLOR, BEIGE, BROWN_DARK, BROWN_LIGHT } from "../themes/globalThemes";
import TextInput from "../components/TextInput";
import SelectBox from "../components/SelectBox";


type LogsScreenProps = CompositeScreenProps<
    BottomTabScreenProps<MainTabParamsList, "Logs">,
    NativeStackScreenProps<RootStackParamsList>
>;

const LogsScreen: React.FC<LogsScreenProps> = ({navigation}) => {
    const {signOut} = useAuth();
    //const user = JSON.parse(SecureStore.getItem("user")!);
    
    const [name, setName] = useState("");
    const [select, setSelect] = useState("") 

    useEffect(() => console.log(select), [select])

    useEffect(() => {
        const setInitialState = navigation.addListener('focus', () => {
            setName("");
        });

        return setInitialState;
      }, [navigation]);

    const data = [
        {key:'', value:'---'},
        {key:'1', value:'Mobiles', disabled:true},
        {key:'2', value:'Appliances'},
        {key:'3', value:'Cameras'},
        {key:'4', value:'Computers', disabled:true},
        {key:'5', value:'Vegetables'},
        {key:'6', value:'Diary Products'},
        {key:'7', value:'Drinks'},
    ]

    return <SafeAreaView style={style.container}>
        <TextInput label={`NOMBRE`} value={name} onChangeText={(name) => setName(name)}/>
        <SelectBox data={data} setSelected={setSelect} save="value" defaultOption={{key:'', value:'---'}}/>
    </SafeAreaView>
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: "center",
        paddingBottom: 20,
        gap: 10,
        backgroundColor: BACKGROUND_COLOR,
    },
    button: {
        borderRadius: 10,
        width: "50%",
        height: 50,
        justifyContent: "center",
    },
    card: {
        backgroundColor: BEIGE,
        width: "80%",
        gap: 0,
        columnGap: 0,
    },
    cardTitle: {
        color: BROWN_LIGHT,
        fontSize: 12,
    }
})

export default LogsScreen;