import { StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { BEIGE, BROWN_DARK } from "../../themes/globalThemes";

const LogPreview: React.FC = () => {
    return <View style={style.container}>
        <Surface elevation={0} style={style.dateSurface}>
            <Text style={style.date}>SAB 20</Text>
        </Surface>
        <Surface elevation={0} style={style.titleSurface}>
            <Text style={style.title}>Mi linda petuña</Text>
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
        justifyContent: "center",
    },
    title: {
        color: BROWN_DARK,
        fontSize: 15,
    }
})

export default LogPreview;