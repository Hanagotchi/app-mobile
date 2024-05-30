import { SafeAreaView, StyleSheet } from "react-native"
import PostList from "../../../components/social/posts/PostList"
import { BACKGROUND_COLOR } from "../../../themes/globalThemes";
import { PostAuthor } from "../../../models/Post";
import { useMemo } from "react";
import { useHanagotchiApi } from "../../../hooks/useHanagotchiApi";
import { useSession } from "../../../hooks/useSession";
import React from "react";

type SearchResultPostsScreenProps = {
    tag: string;
    handleRedirectToProfile: (author: PostAuthor) => void;
    handleRedirectToDetails: (postId: string) => void;
}

const SearchResultPostsScreen: React.FC<SearchResultPostsScreenProps> = ({
    tag, handleRedirectToDetails, handleRedirectToProfile
}) => {
    const api = useHanagotchiApi();
    const userId = useSession((state) => state.session!.userId);
    const updatePost = useMemo(() => {
        if (tag.length >= 2) {
            return (pageNum: number) => api.getPosts({
                page: pageNum,
                per_page: 10,
                tag: tag,
            });
        } else {
            return (pageNum: number) => Promise.resolve([]);
        }
    }, [tag])

    return (
        <SafeAreaView style={style.container}>
            <PostList
                updatePosts={updatePost}
                myId={userId}
                onRedirectToProfile={handleRedirectToProfile}
                onRedirectToDetails={handleRedirectToDetails}
            />
        </SafeAreaView>
    )
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

export default React.memo(SearchResultPostsScreen);