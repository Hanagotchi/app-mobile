import { FlatList, SafeAreaView, ScrollView, StyleSheet } from "react-native"
import { BACKGROUND_COLOR, BROWN_DARK, GREEN } from "../../themes/globalThemes";
import { ActivityIndicator, FAB } from "react-native-paper";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { MainTabParamsList, RootStackParamsList } from "../../navigation/Navigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ReducedPost from "../../components/social/posts/ReducedPost";

import { useMemo } from "react";
import useMyUser from "../../hooks/useMyUser";
import { Post } from "../../models/Post";


const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
const examplePhoto = "https://firebasestorage.googleapis.com/v0/b/hanagotchi.appspot.com/o/plants%2F5%2F1712438363124?alt=media&token=9cdd20c2-43f0-4327-9eb9-8135e6b5a306"

type LogsScreenProps = CompositeScreenProps<
    BottomTabScreenProps<MainTabParamsList, "SocialNetwork">,
    NativeStackScreenProps<RootStackParamsList>
>;

const FeedScreen: React.FC<LogsScreenProps> = ({navigation}) => {

    const handleAddNewPost = () => navigation.navigate("CreatePost");
    
    const {isFetchingMyUser, myUser} = useMyUser();
 
    const mockPost: Post | null = useMemo(() => {

        if (!myUser) {
            return null
        }

        return {
            id: "ididididiidididid",
            author: {
                id: myUser.id,
                name: myUser.name,
                photo: myUser.photo,
                nickname: myUser.nickname,
            },
            content: loremIpsum,
            likes_count: 0,
            updated_at: new Date(),
            created_at: new Date(),
            photo_links: [examplePhoto],
        };
    }, [myUser])

    if (isFetchingMyUser) {
        return <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={{justifyContent: "center", flexGrow: 1}}/>
    }

    return (
        <SafeAreaView style={style.container}>
            <FlatList 
                data={[mockPost!, mockPost!, mockPost!]}
                renderItem={({item}) => <ReducedPost post={item}/>}
                keyExtractor={(item, index) => String(index)}
                contentContainerStyle={{gap: 10}}
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