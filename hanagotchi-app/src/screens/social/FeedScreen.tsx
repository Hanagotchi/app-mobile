import { SafeAreaView, StyleSheet } from "react-native"
import { BACKGROUND_COLOR, GREEN } from "../../themes/globalThemes";
import { FAB } from "react-native-paper";

const FeedScreen: React.FC = () => {

    const handleAddNewPost = () => console.log("Navigate to add new post!");
 
    return (
        <SafeAreaView style={style.container}>
            <FAB 
                icon={"plus"} 
                mode="flat" 
                style={style.fab}
                variant="primary"
                size="medium" 
                color={BACKGROUND_COLOR}
                onPress={handleAddNewPost}
            />
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
    fab: {
        bottom: "4%",
        right: "8%",
        position: 'absolute',
        backgroundColor: GREEN,
        color: BACKGROUND_COLOR,
        borderRadius: 30,
    }
});

export default FeedScreen;