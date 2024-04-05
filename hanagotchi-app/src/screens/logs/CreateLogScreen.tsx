import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { BACKGROUND_COLOR } from "../../themes/globalThemes";
import EditLog from "../../components/logs/EditLog";





const CreateLogScreen: React.FC = () => {

    return <SafeAreaView style={style.container}>
        <EditLog />
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