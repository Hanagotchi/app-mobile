import {FlatList, SafeAreaView, ScrollView, StyleSheet, View} from "react-native"
import {ActivityIndicator, FAB, Text} from "react-native-paper";
import {BACKGROUND_COLOR, BROWN, BROWN_DARK, GREEN, GREEN_DARK} from "../../themes/globalThemes";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamsList} from "../../navigation/Navigator";
import ExpandibleImage from "../../components/ExpandibleImage";
import {useHanagotchiApi} from "../../hooks/useHanagotchiApi";
import {useApiFetch} from "../../hooks/useApiFetch";
import {GetLogByIdResponse} from "../../models/hanagotchiApi";
import NoContent from "../../components/NoContent";
import {handleError} from "../../common/errorHandling";

type LogDetailsScreenProps = NativeStackScreenProps<RootStackParamsList, "LogDetails">

const LogDetailsScreen: React.FC<LogDetailsScreenProps> = ({route}) => {
    const {log_id} = route.params;

    const api = useHanagotchiApi();
    const {isFetching, fetchedData: log, error} = useApiFetch<GetLogByIdResponse | null>(() => api.getLogById(log_id), null)

    if (isFetching) {
        return <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={{justifyContent: "center", flexGrow: 1}}/>;
    }

    if (error) {
        handleError(error);
        return <NoContent />;
    }

    if (!log) {
        return <NoContent />;
    }

    return (
        <SafeAreaView style={style.container}>
            <Text style={style.title}>{log!.title}</Text>
            <View style={{height: 240}}>
                <FlatList 
                    horizontal
                    data={log!.photos}
                    renderItem={({item}) => 
                        <ExpandibleImage 
                            minimizedImageStyle={style.image}
                            maximizedImageStyle={style.fullImage} 
                            source={{uri: item.photo_link}} 
                        />
                    }
                    keyExtractor={(item, index) => String(index)}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={style.photoList}
                />
            </View>
            <ScrollView>
                <Text style={style.content}>{log!.content}</Text>
            </ScrollView>
            <FAB icon={"pencil"} mode="flat" style={style.fab} variant="primary" size="medium" color={BACKGROUND_COLOR}/>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",
        paddingBottom: 20,
        gap: 30,
        backgroundColor: BACKGROUND_COLOR,
        paddingTop: 60,
    },
    title: {
        fontSize: 30,
        color: GREEN_DARK,
        fontStyle: "italic",
        paddingHorizontal: "10%",
    },
    content: {
        color: BROWN,
        paddingHorizontal: "10%",
        alignItems: "flex-start",
    },
    fab: {
        bottom: "8%",
        right: "8%",
        position: 'absolute',
        backgroundColor: GREEN,
        color: BACKGROUND_COLOR,
        borderRadius: 30,
    },
    photoList: {
        paddingHorizontal: "10%",
        gap: 20,
    },
    image: {
        width: 320,
        height: 240,
        borderRadius: 12,
    },
    fullImage: {
        width: 320,
        height: 300,
        borderRadius: 12,
    }
});

export default LogDetailsScreen;