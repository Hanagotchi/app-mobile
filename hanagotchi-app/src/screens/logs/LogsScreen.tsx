import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from "react-native"
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamsList, RootStackParamsList } from "../../navigation/Navigator";
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useFocusEffect, type CompositeScreenProps } from '@react-navigation/native';
import { useCallback, useEffect, useState } from "react";
import { BACKGROUND_COLOR, BEIGE, BROWN_DARK, BROWN_LIGHT, GREEN } from "../../themes/globalThemes";
import { ActivityIndicator, Divider, FAB, Text } from 'react-native-paper';
import SelectBox from "../../components/SelectBox";
import LogPreview from "../../components/logs/LogPreview";
import { useApiFetch } from "../../hooks/useApiFetch";
import { useHanagotchiApi } from "../../hooks/useHanagotchiApi";
import NoContent from "../../components/NoContent";
import * as SecureStore from "expo-secure-store";
import { monthList } from "../../common/dateUtils";

const range = (start: any, end: any) => Array.from({length: (end - start)}, (v, k) => k + start);
const currentYear = (new Date()).getFullYear();
const currentMonth = (new Date()).getMonth() + 1

const years = 
    range(1997, (new Date()).getFullYear()+1)
    .reverse()
    .map((year) => ({key: year, value: String(year)}))

const months = monthList.map((month, idx) => ({key: idx+1, value: month}))

type LogsScreenProps = CompositeScreenProps<
    BottomTabScreenProps<MainTabParamsList, "Logs">,
    NativeStackScreenProps<RootStackParamsList>
>;

const LogsScreen: React.FC<LogsScreenProps> = ({navigation}) => {
    const [year, setYear] = useState<number>(currentYear); 
    const [month, setMonth] = useState<number>(currentMonth);
    const userId = Number(SecureStore.getItem("userId"))

    const api = useHanagotchiApi();
    const [fetchSignal, setFetchSignal] = useState<boolean>(false);
    useFocusEffect(
        useCallback(() => setFetchSignal((prev) => !prev), [])
    )
    const {isFetching, fetchedData, error} = useApiFetch(
        () => api.getLogsByUser(userId, {year: year, month: month}),
        [],
        [year, month, fetchSignal]
    );

    if (!isFetching && error) {
        throw error;
    }

    return <SafeAreaView style={style.container}>
        <Text style={style.title}>Mis Bitácoras</Text>
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
        {
            isFetching ? (
                <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={{justifyContent: "center", flexGrow: 1}}/>
            ) : (fetchedData.length === 0 ? (
                    <NoContent />
                ) : (
                    <ScrollView contentContainerStyle={style.logList}>
                        {fetchedData.map((log) => (
                            <LogPreview
                                key={log.id}
                                createdAt={log.created_at} 
                                title={log.title}
                                mainPhotoUri={log.photos.length > 0 ? log.photos[0].photo_link : undefined}
                                onPress={() => navigation.navigate("LogDetails", {log_id: log.id, created_at: log.created_at})}
                            />
                        ))}
                    </ScrollView>
                )
            )
        }
        <FAB 
            icon={"plus"} 
            mode="flat" 
            style={style.fab}
            variant="primary"
            size="medium" 
            color={BACKGROUND_COLOR}
            onPress={() => navigation.navigate("CreateLog")}
        />
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
    title: {
        fontSize: 36,
        marginTop: StatusBar.currentHeight! + 10,
        color: BROWN_DARK
    },
    filters: {
        gap: 10,
        flexDirection: "row",
        alignItems: "flex-start",
    },
    logList: {
        gap: 20,
        width: "100%"
    },
    fab: {
        bottom: "4%",
        right: "8%",
        position: 'absolute',
        backgroundColor: GREEN,
        color: BACKGROUND_COLOR,
        borderRadius: 30,
    }
})

export default LogsScreen;