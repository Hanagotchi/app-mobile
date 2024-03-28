import { TextInput as PaperTextInput } from "react-native-paper";
import {StyleSheet} from "react-native";
import { BEIGE, BROWN_DARK } from "../themes/globalThemes";
import BackgroundCard from "./BackgroundCard";

type TextInputProps = {
    label: string;
    value: string;
    onChangeText: (((text: string) => void) & Function);
}

const TextInput: React.FC<TextInputProps> = ({label, value, onChangeText}) => {
    return (
        <BackgroundCard title={label}>
            <PaperTextInput
                value={value}
                onChangeText={onChangeText}
                mode="flat"
                selectionColor={BEIGE}
                cursorColor={BROWN_DARK}
                textColor={BROWN_DARK}
                style={style.textInput}
                contentStyle={style.content}
                underlineStyle={style.underline}  
            />
        </BackgroundCard>
    )
};

const style = StyleSheet.create({
    textInput: {
        height: 20,
    },
    content: {
        backgroundColor: BEIGE,
        paddingLeft: 0,
    },
    underline: {
        display: "none"
    }
});

export default TextInput;