import { StyleSheet, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from "react-native-paper";
import { BEIGE, BEIGE_DARK, BROWN_DARK, BROWN_LIGHT } from "../themes/globalThemes";

const NoContent: React.FC = () => {
    return <View style={style.container}>
        <MaterialIcons name="content-paste-off" size={200} color={BEIGE} />
        <Text style={style.text}>Sin resultados</Text>
    </View>
};

const style = StyleSheet.create({
    container: {flexGrow: 1, justifyContent: "center"},
    text: {color: BEIGE, fontSize: 30}
})

export default NoContent;