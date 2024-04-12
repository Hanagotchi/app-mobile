import { PostData, PostDataWithoutAuthorId } from "../../../models/Post";
import { StyleSheet, View } from "react-native";
import TextInput from "../../TextInput";
import { useEffect, useState } from "react";
import LoaderButton from "../../LoaderButton";
import PhotoUploader from "../../PhotoUploader";

type EditPostProps = {
    initValues?: PostData;
    onSubmit: ((data: PostDataWithoutAuthorId) => void);
    buttonLabel: string;
}

const defaultData: PostDataWithoutAuthorId = {
    content: "",
    photo_links: [],
}

const CONTENT_MAX_LENGTH = 500;

const EditPost: React.FC<EditPostProps> = ({initValues = defaultData, onSubmit, buttonLabel}) => {

    const [data, setData] = useState<PostDataWithoutAuthorId>(initValues);
    const [contentLen, setContentLen] = useState<number>(initValues.content.length);

    const onChangeContent = (content: string) => setData((oldValues) => ({...oldValues, content}));
    useEffect(() => setContentLen(data.content.length), [data.content]);
    const onChangePhotos = (photo_links: string[]) => setData((oldValues) => ({...oldValues, photo_links}));
    console.log(data)

    return (
        <View style={style.container}>
            <View style={style.container}>
                <TextInput 
                    label={`${contentLen}/${CONTENT_MAX_LENGTH} *`}
                    value={data.content} 
                    onChangeText={onChangeContent}
                    numberOfLines={4}
                    maxLenght={CONTENT_MAX_LENGTH}
                />
                <PhotoUploader 
                    maxAmount={4} 
                    photosFilepathList={data.photo_links} 
                    updatePhotosFilepathList={onChangePhotos}
                    imageSize={{
                        width: 200,
                        height: 300,
                    }}
                />
            </View>
            <LoaderButton
                mode="contained"
                uppercase
                style={style.button}
                labelStyle={{ fontSize: 17 }}
                onPress={() => onSubmit(data)}
                disabled={data.content.length === 0}
            >
                {buttonLabel}
            </LoaderButton>
        </View>
    )
    
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",
        marginTop: 20,
        paddingBottom: 20,
        gap: 20,
        width: "100%"
    },
    button: {
        borderRadius: 10,
        width: "50%",
        height: 50,
        justifyContent: "center",
    },
});

export default EditPost;