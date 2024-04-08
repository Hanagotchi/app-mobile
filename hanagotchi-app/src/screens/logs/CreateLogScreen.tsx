import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { BACKGROUND_COLOR } from "../../themes/globalThemes";
import EditLog from "../../components/logs/EditLog";
import { CreateLogSchema, LogData } from "../../models/Log";
import { useHanagotchiApi } from "../../hooks/useHanagotchiApi";
import useFirebase from "../../hooks/useFirebase";
import { logPhotoUrl } from "../../contexts/FirebaseContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../../navigation/Navigator";
import ConfirmBackpressDialog from "../../components/ConfirmBackpressDialog";

type CreateLogScreenProps = NativeStackScreenProps<RootStackParamsList, "CreateLog">

const CreateLogScreen: React.FC<CreateLogScreenProps> = ({navigation}) => {

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
            await api.createLog(createLogBody);
            navigation.goBack();
        } catch (err) {
            throw err;
        }
    }

    return <SafeAreaView style={style.container}>
        <ConfirmBackpressDialog goBack={navigation.goBack}/>
        <EditLog onSubmit={submit} buttonLabel="Crear"/>
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