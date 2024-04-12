import { SafeAreaView, StyleSheet } from "react-native"
import { Text } from "react-native-paper"
import { BACKGROUND_COLOR } from "../../themes/globalThemes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../../navigation/Navigator";

type CreateLogScreenProps = NativeStackScreenProps<RootStackParamsList, "CreateLog">

const CreatePostScreen: React.FC<CreateLogScreenProps> = () => {
    return (
        <SafeAreaView style={style.container}>
            <Text>Create post!!</Text>
        </SafeAreaView>
    )
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

export default CreatePostScreen;