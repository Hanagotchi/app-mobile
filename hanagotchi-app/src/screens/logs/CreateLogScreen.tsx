import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { BACKGROUND_COLOR } from "../../themes/globalThemes";
import EditLog from "../../components/logs/EditLog";
import { CreateLogSchema, LogData, LogDataSchema } from "../../models/Log";
import { useHanagotchiApi } from "../../hooks/useHanagotchiApi";
import useFirebase from "../../hooks/useFirebase";
import { logPhotoUrl } from "../../contexts/FirebaseContext";

const CreateLogScreen: React.FC = () => {

    const api = useHanagotchiApi();
    const {uploadImage} = useFirebase();

    const submit = async (data: LogData) => {
        try {
            const photos = await Promise.all(
                data.photos.map(photo => uploadImage(photo, logPhotoUrl(data.plant_id)))
            );
            const createLogBody = CreateLogSchema.parse({
                ...data,
                photos: photos.map(ph => ({photo_link: ph}))
            });
            console.log(createLogBody)
        } catch (err) {
            console.log(err)
        }
    }

    return <SafeAreaView style={style.container}>
        <EditLog onSubmit={submit}/>
    </SafeAreaView>
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",
        paddingBottom: 20,
        gap: 20,
        backgroundColor: BACKGROUND_COLOR,
    },
});

export default CreateLogScreen;