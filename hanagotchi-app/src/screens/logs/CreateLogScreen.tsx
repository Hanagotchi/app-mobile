import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { BACKGROUND_COLOR } from "../../themes/globalThemes";
import EditLog from "../../components/logs/EditLog";
import { LogData, LogDataSchema } from "../../models/Log";
import { handleError } from "../../common/errorHandling";

const CreateLogScreen: React.FC = () => {

    const submit = (data: LogData) => {
        try {
            const parsedData: LogData = LogDataSchema.parse(data);
            console.log(parsedData);
        } catch (e) {
            handleError(e as Error);
        }
    }

    return <SafeAreaView style={style.container}>
        <EditLog handleSubmit={submit}/>
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