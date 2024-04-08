import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { BACKGROUND_COLOR } from "../../themes/globalThemes";
import EditLog from "../../components/logs/EditLog";
import { LogData, PartialUpdateLogSchema } from "../../models/Log";
import { useHanagotchiApi } from "../../hooks/useHanagotchiApi";
import useFirebase from "../../hooks/useFirebase";
import { logPhotoUrl } from "../../contexts/FirebaseContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../../navigation/Navigator";
import { AxiosError } from "axios";
import ConfirmBackpressDialog from "../../components/ConfirmBackpressDialog";

type EditLogScreenProps = NativeStackScreenProps<RootStackParamsList, "EditLog">

const EditLogScreen: React.FC<EditLogScreenProps> = ({navigation, route}) => {
    const {log} = route.params;
    const initLogData: LogData = {
        title: log.title,
        content: log.content,
        plant_id: log.plant_id,
        photos: log.photos.map(({photo_link}) => photo_link),
    }

    const api = useHanagotchiApi();
    const {uploadImage} = useFirebase();

    const submit = async (updatedData: LogData) => {

        const photosToUpload = updatedData.photos.filter((ph) => !initLogData.photos.includes(ph));
        const photosToDelete = log.photos.filter(({photo_link}) => !updatedData.photos.includes(photo_link));
        console.log(photosToUpload);
        console.log(photosToDelete);
        const oldPhotos = updatedData.photos.filter((ph) => initLogData.photos.includes(ph)).map(ph => ({photo_link: ph}));

        try {
            const newPhotos = (await Promise.all(
                photosToUpload.map(photo => uploadImage(photo, logPhotoUrl(updatedData.plant_id)))
            )).map(ph => ({photo_link: ph}));

            const editLogBody = PartialUpdateLogSchema.parse({
                title: (initLogData.title !== updatedData.title) ? updatedData.title : undefined,
                content: (initLogData.content !== updatedData.content) ? updatedData.content : undefined,
                plant_id: (initLogData.plant_id !== updatedData.plant_id) ? updatedData.plant_id : undefined,
            });

            await Promise.all([
                api.editLog(log.id, editLogBody),
                Promise.all(newPhotos.map((ph) => api.addPhotoToLog(log.id, ph))),
                Promise.all(photosToDelete.map((ph) => api.deletePhotoFromLog(log.id, ph.id)))
            ]);

            navigation.goBack();
        } catch (err) {
            console.log((err as AxiosError).toJSON())
        }
    }

    return <SafeAreaView style={style.container}>
        <ConfirmBackpressDialog goBack={navigation.goBack}/>
        <EditLog initValues={initLogData} onSubmit={submit} buttonLabel="Actualizar"/>
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

export default EditLogScreen;