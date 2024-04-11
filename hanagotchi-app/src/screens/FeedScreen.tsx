import { SafeAreaView, StyleSheet } from "react-native"
import { BACKGROUND_COLOR } from "../themes/globalThemes";

const FeedScreen: React.FC = () => {
    return (
        <SafeAreaView style={style.container}>
            
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: "center",
        paddingBottom: 20,
        gap: 10,
        backgroundColor: BACKGROUND_COLOR,
    },
});

export default FeedScreen;