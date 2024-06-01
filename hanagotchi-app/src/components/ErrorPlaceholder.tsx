import {StyleSheet, View} from "react-native";
import {MaterialIcons} from '@expo/vector-icons';
import {Text} from "react-native-paper";
import {BEIGE} from "../themes/globalThemes";

type ErrorPlaceholderProps = {
    message?: string;
    fontSize?: number; 
}

const ErrorPlaceholder: React.FC<ErrorPlaceholderProps> = ({message = "Ha ocurrido un error inesperado", fontSize = 30}) => {
    return <View style={style.container}>
        <MaterialIcons name="error-outline" size={200} color={BEIGE} />
        <Text style={{...style.text, fontSize}}>{message}</Text>
    </View>
};

const style = StyleSheet.create({
    container: {flexGrow: 1, justifyContent: "center", alignItems: "center"},
    text: {color: BEIGE, textAlign: "center"}
})

export default ErrorPlaceholder;