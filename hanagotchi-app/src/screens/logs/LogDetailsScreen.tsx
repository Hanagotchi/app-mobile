import {FlatList, SafeAreaView, ScrollView, StyleSheet, View} from "react-native"
import {ActivityIndicator, FAB, Text} from "react-native-paper";
import {BACKGROUND_COLOR, BROWN, BROWN_DARK, GREEN, GREEN_DARK} from "../../themes/globalThemes";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamsList} from "../../navigation/Navigator";
import ExpandibleImage from "../../components/ExpandibleImage";
import {useHanagotchiApi} from "../../hooks/useHanagotchiApi";
import {GetLogByIdResponse} from "../../models/hanagotchiApi";
import NoContent from "../../components/NoContent";
import {handleError} from "../../common/errorHandling";
import {useFocusApiFetch} from "../../hooks/useFocusApiFetch";
import { useMyPlants } from "../../hooks/useMyPlants";
import { useMemo } from "react";
import { useApiFetch } from "../../hooks/useApiFetch";
import { useSession } from "../../hooks/useSession";

type LogDetailsScreenProps = NativeStackScreenProps<RootStackParamsList, "LogDetails">

const LogDetailsScreen: React.FC<LogDetailsScreenProps> = ({route, navigation}) => {
    const {log_id} = route.params;
    const userId = useSession((state) => state.session?.userId);
    const api = useHanagotchiApi();

    const {isFetching: isFetchingMyPlants, fetchedData: myPlants, error: plantsError} = useApiFetch(() => api.getPlants({id_user: userId}), []);

    const {
        isFetching,
        fetchedData: log,
        error
    } = useFocusApiFetch<GetLogByIdResponse | null>(() => api.getLogById(log_id), null, [log_id]);

    const thisPlant = useMemo(() => myPlants.find(p => p.id === log?.plant_id), [myPlants, log])

    if (isFetching || isFetchingMyPlants) {
        return (
            <SafeAreaView style={style.container}>
                <ActivityIndicator
                    animating={true}
                    color={BROWN_DARK}
                    size={80}
                    style={{justifyContent: "center", flexGrow: 1}}
                />
            </SafeAreaView>
        );
    }

    if (error) {
        handleError(error);
        return <NoContent />;
    }
    
    if (plantsError) {
        handleError(plantsError);
        return <NoContent />;
    }

    if (!log) {
        return <NoContent />;
    }

    return (
        <SafeAreaView style={style.container}>
            <Text style={style.title}>{log.title}</Text>
            <Text style={style.plant}>Sobre: {thisPlant?.name}</Text>
            {log.photos.length > 0 && (
                <View style={{height: 240}}>
                    <FlatList
                        horizontal
                        data={log.photos}
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
            )}
            <ScrollView>
                <Text style={style.content}>{log!.content}</Text>
            </ScrollView>
            <FAB
                icon={"pencil"}
                mode="flat"
                style={style.fab}
                variant="primary"
                size="medium"
                color={BACKGROUND_COLOR}
                onPress={() => navigation.navigate("EditLog", {log: log})}
            />
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
    plant: {
        color: BROWN,
        paddingHorizontal: "10%",
        fontSize: 18,
        fontWeight: "bold",
        alignItems: "flex-start",
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