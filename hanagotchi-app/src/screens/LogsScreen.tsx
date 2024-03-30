import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native"
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamsList, RootStackParamsList } from "../navigation/Navigator";
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { BACKGROUND_COLOR, BEIGE, BROWN_LIGHT } from "../themes/globalThemes";
import { Divider, Text } from 'react-native-paper';
import SelectBox from "../components/SelectBox";

const range = (start: any, end: any) => Array.from({length: (end - start)}, (v, k) => k + start);
const currentYear = (new Date()).getFullYear();
const currentMonth = (new Date()).getMonth()


const years = 
    range(1997, (new Date()).getFullYear()+1)
    .reverse()
    .map((year) => ({key: year, value: String(year)}))

const months = [
    {key: 0, value: "Enero"},
    {key: 1, value: "Febrero"},
    {key: 2, value: "Marzo"},
    {key: 3, value: "Abril"},
    {key: 4, value: "Mayo"},
    {key: 5, value: "Junio"},
    {key: 6, value: "Julio"},
    {key: 7, value: "Agosto"},
    {key: 8, value: "Septiembre"},
    {key: 9, value: "Octubre"},
    {key: 10, value: "Noviembre"},
    {key: 11, value: "Diciembre"},
]

type LogsScreenProps = CompositeScreenProps<
    BottomTabScreenProps<MainTabParamsList, "Logs">,
    NativeStackScreenProps<RootStackParamsList>
>;

const LogsScreen: React.FC<LogsScreenProps> = ({navigation}) => {
    const [year, setYear] = useState<number>(currentYear); 
    const [month, setMonth] = useState<number>(currentMonth); 

    useEffect(() => {
        console.log(year, month)
    }, [year, month])

    useEffect(() => {
        const setInitialState = navigation.addListener('focus', () => {
            setYear((new Date()).getFullYear());
        });

        return setInitialState;
      }, [navigation]);

      

    return <SafeAreaView style={style.container}>
        <Text style={{
            fontSize: 36,
            marginTop: StatusBar.currentHeight! + 10,
        }}>Mis Bitácoras</Text>
        <View style={style.filters}>
            <SelectBox
                label="AÑO" 
                data={years} 
                setSelected={setYear} 
                save="key" 
                defaultOption={years.find(v => v.key === currentYear)}
                width="30%"
            />
            <SelectBox 
                label="MES" 
                data={months} 
                setSelected={setMonth} 
                save="key"
                defaultOption={months.find(v => v.key === currentMonth)}
                width="50%"
            />
        </View>
        <Divider bold style={{width: "90%"}}/>
        <Text>Hola</Text>
    </SafeAreaView>
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",
        paddingBottom: 20,
        gap: 20,
        backgroundColor: BACKGROUND_COLOR,
    },
    filters: {
        gap: 10,
        flexDirection: "row",
        alignItems: "flex-start",
    }
})

export default LogsScreen;