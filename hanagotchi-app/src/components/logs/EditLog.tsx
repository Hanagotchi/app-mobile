import { LogData } from "../../models/Log";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import TextInput from "../TextInput";
import PhotoUploader from "../PhotoUploader";
import LoaderButton from "../LoaderButton";
import { useApiFetch } from "../../hooks/useApiFetch";
import { useHanagotchiApi } from "../../hooks/useHanagotchiApi";
import { GetPlantsResponse } from "../../models/hanagotchiApi";
import { BROWN_DARK } from "../../themes/globalThemes";
import SelectBox, { SelectOption } from "../SelectBox";
import { useSession } from "../../hooks/useSession";
import AffectiveSlider from "../AffectiveSlider";

type EditLogProps = {
    initValues?: LogData;
    onSubmit: ((data: LogData) => void);
    buttonLabel: string;
}

const defaultData: LogData = {
    title: "",
    content: "",
    plant_id: 0,
    photos: [],
}

const TITLE_MAX_LENGTH = 80;
const CONTENT_MAX_LENGTH = 500;

const EditLog: React.FC<EditLogProps> = ({initValues = defaultData, onSubmit, buttonLabel}) => {

    const [data, setData] = useState<LogData>(initValues);
    const [contentLen, setContentLen] = useState<number>(initValues.content.length);
    const id_user = useSession((state) => state.session?.userId)!;
    const api = useHanagotchiApi()
    const {isFetching, fetchedData, error} = useApiFetch<GetPlantsResponse>(() => api.getPlants({id_user, limit: 1024}), []);
    const myPlants: SelectOption[] = useMemo(() => {
        return fetchedData.map(plant => ({
            key: plant.id,
            value: plant.name,
        }));
    }, [fetchedData])

    const onChangeTitle = (title: string) => setData((oldValues) => ({...oldValues, title}));
    const onChangeContent = (content: string) => setData((oldValues) => ({...oldValues, content}));
    const onChangePlant = (plant_id: number) => setData((oldValues) => ({...oldValues, plant_id}))
    const onChangePhotos = (photos: string[]) => setData((oldValues) => ({...oldValues, photos}));

    useEffect(() => setContentLen(data.content.length), [data.content]);

    if (isFetching) {
        return <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={{justifyContent: "center", flexGrow: 1}}/>
    }

    if (!isFetching && error) {
        throw error;
    }

    return (
        <View style={style.container}>
            <ScrollView style={style.form} contentContainerStyle={style.content}>
                <TextInput
                    maxLenght={TITLE_MAX_LENGTH}
                    label={`TÍTULO ${data.title.length}/${TITLE_MAX_LENGTH} *`} 
                    value={data.title} 
                    onChangeText={onChangeTitle}
                />
                <SelectBox 
                    label="PLANTA" 
                    data={myPlants} 
                    setSelected={onChangePlant} 
                    save="key"
                    defaultOption={myPlants.length > 0 ? myPlants.find(p => p.key === initValues.plant_id) : {key: 0, value: "---"}}
                />
                <TextInput 
                    label={`BITÁCORA ${contentLen}/${CONTENT_MAX_LENGTH} *`}
                    value={data.content} 
                    onChangeText={onChangeContent}
                    numberOfLines={4}
                    maxLenght={CONTENT_MAX_LENGTH}
                />
                <PhotoUploader 
                    maxAmount={4} 
                    photosFilepathList={data.photos} 
                    updatePhotosFilepathList={onChangePhotos}
                />
            </ScrollView>
            <LoaderButton
                mode="contained"
                uppercase
                style={style.button}
                labelStyle={{ fontSize: 17 }}
                onPress={() => onSubmit(data)}
                disabled={data.content.length === 0 || data.title.length === 0 || data.plant_id === 0}
            >
                {buttonLabel}
            </LoaderButton>
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
        width: "100%",
        flexGrow: 1,
    },
    form: {
        flex: 1,
        flexGrow: 1,
        width: "100%",
    },
    content: {
        justifyContent: 'flex-start',
        alignItems: "center",
        gap: 20,
        width: "100%",
    },
    button: {
        borderRadius: 10,
        width: "50%",
        height: 50,
        justifyContent: "center",
    },
})

export default EditLog;