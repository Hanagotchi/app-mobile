import { StyleSheet, View, Image } from "react-native";
import { Surface, Text } from "react-native-paper";
import { BEIGE, BROWN_DARK } from "../../themes/globalThemes";
import { getSpanishSimplifiedDate } from "../../common/dateUtils";

type LogPreviewProps = {
    createdAt: Date;
    title: string;
    mainPhotoUri?: string;
};

const LogPreview: React.FC<LogPreviewProps> = ({createdAt, title, mainPhotoUri}) => {
    return <View style={style.container}>
        <Surface elevation={0} style={style.dateSurface}>
            <Text style={style.date}>{`${getSpanishSimplifiedDate(createdAt.getDay())} ${createdAt.getDate()}`}</Text>
        </Surface>
        <Surface elevation={0} style={style.titleSurface}>
            <Text 
                numberOfLines={1} 
                ellipsizeMode="tail" 
                style={{...style.title, width: mainPhotoUri ? "80%" : "100%"}}
            >
                {title}
            </Text>
            {mainPhotoUri && <Image style={style.image} source={{uri: mainPhotoUri}}/>}
        </Surface>
    </View>
}

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
    },
    dateSurface: {
        width: 90,
        height: 60,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: BEIGE,
    },
    date: {
        color: BROWN_DARK,
        fontWeight: "bold",
        fontSize: 20
    },
    titleSurface: {
        width: 220,
        height: 40,
        borderRadius: 8,
        paddingHorizontal: 10,
        textAlign: "left",
        backgroundColor: BEIGE,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    title: {
        color: BROWN_DARK,
        fontSize: 15,
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 6
    }
})

export default LogPreview;