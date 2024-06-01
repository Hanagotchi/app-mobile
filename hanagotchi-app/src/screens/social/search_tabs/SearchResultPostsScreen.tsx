import { SafeAreaView, StyleSheet } from "react-native"
import PostList from "../../../components/social/posts/PostList"
import { BACKGROUND_COLOR, BROWN_DARK } from "../../../themes/globalThemes";
import { PostAuthor } from "../../../models/Post";
import { useCallback, useMemo } from "react";
import { useHanagotchiApi } from "../../../hooks/useHanagotchiApi";
import { useSession } from "../../../hooks/useSession";
import React from "react";
import TagSuscription from "../../../components/social/TagSuscription";
import { ActivityIndicator, Divider } from "react-native-paper";
import useTags from "../../../hooks/useTags";

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
    const {isFetching, tags: myTags, error, subscribe, unsubscribe} = useTags();
    const isSuscribed = useMemo(() => {
        console.log(myTags);
        return myTags.has(tag.toLowerCase());
    }, [myTags, tag]);

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