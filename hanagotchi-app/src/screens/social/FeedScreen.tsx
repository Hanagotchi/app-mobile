import { SafeAreaView, StyleSheet } from "react-native"
import { BACKGROUND_COLOR, GREEN } from "../../themes/globalThemes";
import { FAB } from "react-native-paper";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { MainTabParamsList, RootStackParamsList } from "../../navigation/Navigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import PostList from "../../components/social/posts/PostList";
import { useHanagotchiApi } from "../../hooks/useHanagotchiApi";
import * as SecureStore from "expo-secure-store";
import { useMemo } from "react";

type LogsScreenProps = CompositeScreenProps<
    BottomTabScreenProps<MainTabParamsList, "SocialNetwork">,
    NativeStackScreenProps<RootStackParamsList>
>;

const FeedScreen: React.FC<LogsScreenProps> = ({navigation}) => {
    const api = useHanagotchiApi();
    const userId = useMemo(() => Number(SecureStore.getItem("userId")), []);
    const handleAddNewPost = () => navigation.navigate("CreatePost");

    return (
        <SafeAreaView style={style.container}>
            <PostList
                updatePosts={(pageNum: number) => api.dummyGetPosts(pageNum, 10)}
                myId={userId}
            />
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
        justifyContent: 'center',
        alignItems: "center",
        paddingTop: 20,
        paddingHorizontal: "5%",
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