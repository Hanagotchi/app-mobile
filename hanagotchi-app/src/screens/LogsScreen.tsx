import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native"
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamsList, RootStackParamsList } from "../navigation/Navigator";
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { BACKGROUND_COLOR, BEIGE, BROWN_LIGHT } from "../themes/globalThemes";
import { Text } from 'react-native-paper';
import SelectBox from "../components/SelectBox";

const range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);

type LogsScreenProps = CompositeScreenProps<
    BottomTabScreenProps<MainTabParamsList, "Logs">,
    NativeStackScreenProps<RootStackParamsList>
>;

const LogsScreen: React.FC<LogsScreenProps> = ({navigation}) => {
    const [year, setYear] = useState((new Date()).getFullYear()); 

    useEffect(() => {
        const setInitialState = navigation.addListener('focus', () => {
            setYear((new Date()).getFullYear());
        });

        return setInitialState;
      }, [navigation]);

    const years = range(2022, (new Date()).getFullYear()+1).map((year) => ({key: year, value: String(year)}),)

    return <SafeAreaView style={style.container}>
        <Text style={{
            fontSize: 36,
            marginTop: StatusBar.currentHeight! + 10,
        }}>Mis Bitácoras</Text>
        <View>
            <SelectBox label="AÑO" data={years} setSelected={setYear} save="key"/>
        </View>
    </SafeAreaView>
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",
        paddingBottom: 20,
        gap: 10,
        backgroundColor: BACKGROUND_COLOR,
    },
})

export default LogsScreen;