import { TextInput as PaperTextInput } from "react-native-paper";
import { TextInput as NativeTextInput } from "react-native";
import {StyleSheet} from "react-native";
import { BEIGE, BROWN_DARK } from "../themes/globalThemes";
import BackgroundCard from "./BackgroundCard";

type TextInputProps = {
    label: string;
    value: string;
    onChangeText: (((text: string) => void) & Function);
    numberOfLines?: number;
    maxLenght?: number;
}

const TextInput: React.FC<TextInputProps> = ({label, value, onChangeText, numberOfLines = 1, maxLength}) => {
    const isTextArea = numberOfLines > 1;
    return (
        <BackgroundCard title={label}>
            <NativeTextInput 
                value={value}
                onChangeText={onChangeText}
                selectionColor={BROWN_DARK}
                multiline={isTextArea}
                numberOfLines={numberOfLines}
                style={style.textInput}
                maxLength={maxLength}
            />
        </BackgroundCard>
    )
};

const style = StyleSheet.create({
    textInput: {
        color: BROWN_DARK,
        fontSize: 16,
        textAlignVertical: "top",
    },
});

export default TextInput;