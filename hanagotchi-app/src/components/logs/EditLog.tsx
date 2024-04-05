import { Text } from "react-native-paper"
import { LogData } from "../../models/Log";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import TextInput from "../TextInput";

type EditLogProps = {
    initValues?: LogData; 
}

const defaultData: LogData = {
    title: "",
    content: "",
    photos: [],
}

const CONTENT_MAX_LENGTH = 500;

const EditLog: React.FC<EditLogProps> = ({initValues = defaultData}) => {

    const [data, setData] = useState<LogData>(initValues);
    const [contentLen, setContentLen] = useState<number>(initValues.content.length);

    const onChangeTitle = (title: string) => setData((oldValues) => ({...oldValues, title}));
    const onChangeContent = (content: string) => setData((oldValues) => ({...oldValues, content}));

    useEffect(() => setContentLen(data.content.length), [data.content]);

    return (
        <View style={style.container}>
            <TextInput label="TÍTULO" value={data.title} onChangeText={onChangeTitle}/>
            <TextInput 
                label={`BITÁCORA ${contentLen}/${CONTENT_MAX_LENGTH}`}
                value={data.content} 
                onChangeText={onChangeContent}
                numberOfLines={4}
                maxLenght={CONTENT_MAX_LENGTH}
            />
        </View>
    )
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",
        paddingBottom: 20,
        gap: 20,
        width: "100%"
    }
})

export default EditLog;