import { StyleSheet, SafeAreaView, ScrollView, Image } from "react-native"
import { FAB, Text } from "react-native-paper";
import { BACKGROUND_COLOR, BROWN, GREEN, GREEN_DARK } from "../themes/globalThemes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigation/Navigator";
import ExpandibleImage from "../components/ExpandibleImage";

type LogDetailsScreenProps = NativeStackScreenProps<RootStackParamsList, "LogDetails">

const LogDetailsScreen: React.FC<LogDetailsScreenProps> = ({route}) => {
    const {log} = route.params;
    console.log(log)

    return (
        <SafeAreaView style={style.container}>
            <Text style={style.title}>{log.title}</Text>
            <ScrollView horizontal style={{flexGrow: undefined}} contentContainerStyle={style.photoList}>
                {log.photos.map((photo) => <ExpandibleImage 
                    key={photo.id} 
                    minimizedImageStyle={style.image}
                    maximizedImageStyle={style.fullImage} 
                    source={{uri: photo.photo_link}} 
                />)}
            </ScrollView>
            <ScrollView>
                <Text style={style.content}>{log.content}</Text>
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
        gap: 40,
        backgroundColor: BACKGROUND_COLOR,
        paddingTop: 40,
    },
    title: {
        fontSize: 36,
        color: GREEN_DARK,
        fontStyle: "italic",
        paddingHorizontal: "10%",
    },
    content: {
        color: BROWN,
        paddingHorizontal: "10%",
    },
    fab: {
        bottom: 16,
        right: 16,
        position: 'absolute',
        backgroundColor: GREEN,
        color: BACKGROUND_COLOR,
    },
    photoList: {
        paddingHorizontal: "10%",
        gap: 20,
    },
    image: {
        width: 160,
        height: 150,
        borderRadius: 12,
    },
    fullImage: {
        width: 320,
        height: 300,
        borderRadius: 12,
    }
});

export default LogDetailsScreen;