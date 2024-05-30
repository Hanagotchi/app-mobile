import { SafeAreaView, StyleSheet } from "react-native";
import { BACKGROUND_COLOR, BEIGE, BEIGE_DARK, GREEN } from "../../themes/globalThemes";
import { Appbar, Searchbar, Text } from "react-native-paper";
import { CompositeScreenProps } from "@react-navigation/native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { SocialDrawerList } from "../../navigation/social/SocialDrawer";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { MainTabParamsList, RootStackParamsList } from "../../navigation/Navigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { useApiFetch } from "../../hooks/useApiFetch";
import { PostAuthor } from "../../models/Post";
import { useHanagotchiApi } from "../../hooks/useHanagotchiApi";
import { useSession } from "../../hooks/useSession";
import PostList from "../../components/social/posts/PostList";

type SearchScreenProps = CompositeScreenProps<
    DrawerScreenProps<SocialDrawerList, "Search">,
    CompositeScreenProps<
        BottomTabScreenProps<MainTabParamsList, "SocialNetwork">,
        NativeStackScreenProps<RootStackParamsList>
    >
>;

const SearchScreen: React.FC<SearchScreenProps> = ({route, navigation}) => {
    const [query, setQuery] = useState<string>(route.params.initSearch);
    const api = useHanagotchiApi();
    const userId = useSession((state) => state.session!.userId);

    const handleRedirectToProfile = (author: PostAuthor) => {
        navigation.navigate(
            "SocialProfile", 
            {profileId: author.id, headerTitle: author.id === userId ? "Mi perfil" : author.name!}
        )
    };
    
    const handleRedirectToDetails = (postId: string) => {
        navigation.navigate(
            "PostDetails",
            {postId: postId}
        )
    }

    const updatePost = useMemo(() => {
        if (query.length >= 2) {
            return (pageNum: number) => api.getPosts({
                page: pageNum,
                per_page: 10,
                tag: query,
            });
        } else {
            return (pageNum: number) => Promise.resolve([]);
        }
    }, [query])

    return <SafeAreaView style={style.container}>
        <Searchbar 
            value={query} 
            theme={{ colors: { elevation: {level3: BEIGE} } }}
            onChangeText={setQuery}
        />
        <PostList
            updatePosts={updatePost}
            myId={userId}
            onRedirectToProfile={handleRedirectToProfile}
            onRedirectToDetails={handleRedirectToDetails}
        />
    </SafeAreaView>
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal: "5%",
        gap: 20,
        backgroundColor: BACKGROUND_COLOR,
    }
});

export default SearchScreen;