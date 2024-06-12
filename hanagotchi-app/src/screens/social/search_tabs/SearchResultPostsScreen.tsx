import { SafeAreaView, StyleSheet } from "react-native"
import PostList from "../../../components/social/posts/PostList"
import { BACKGROUND_COLOR, BROWN_DARK } from "../../../themes/globalThemes";
import { PostAuthor, ReducedPost } from "../../../models/Post";
import { useCallback, useMemo } from "react";
import { useHanagotchiApi } from "../../../hooks/useHanagotchiApi";
import { useSession } from "../../../hooks/useSession";
import React from "react";
import TagSuscription from "../../../components/social/TagSuscription";
import { ActivityIndicator, Divider } from "react-native-paper";
import useTags from "../../../hooks/useTags";

type SearchResultPostsScreenProps = {
    tag: string;
    updatePostList: (pageNum: number) => Promise<ReducedPost[]>
    handleRedirectToProfile: (author: PostAuthor) => void;
    handleRedirectToDetails: (postId: string) => void;
}

const SearchResultPostsScreen: React.FC<SearchResultPostsScreenProps> = ({
    tag, handleRedirectToDetails, handleRedirectToProfile, updatePostList
}) => {
    const userId = useSession((state) => state.session!.userId);
    const {isFetching, tags: myTags, error, subscribe, unsubscribe} = useTags();
    const isSuscribed = useMemo(() => {
        return myTags.has(tag.toLowerCase());
    }, [myTags, tag]);

    if (isFetching) {
        return (
            <SafeAreaView style={style.container}>
                <ActivityIndicator
                    animating={true}
                    color={BROWN_DARK}
                    size={80}
                    style={{justifyContent: "center", flexGrow: 1}}
                />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={style.container}>
            {tag.length > 1 && <>
                <TagSuscription 
                    tag={tag}
                    isSuscribed={isSuscribed}
                    suscribeToTag={subscribe}
                    unSuscribeToTag={unsubscribe}
                    showError={error !== null}
                />
                <Divider bold style={{width: "100%"}}/>
            </>}
            <PostList
                updatePosts={updatePostList}
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