import { FlatList, RefreshControl } from "react-native"
import {ReducedPost} from "./Post";
import { ActivityIndicator, Divider, Text } from "react-native-paper";
import { BEIGE_DARK, BROWN_DARK } from "../../../themes/globalThemes";
import { PostAuthor, ReducedPost as ReducedPostType } from "../../../models/Post";
import { useHanagotchiApi } from "../../../hooks/useHanagotchiApi";
import { usePosts } from "../../../hooks/usePosts";
import { useCallback } from "react";
import ErrorPlaceholder from "../../ErrorPlaceholder";
import NoContent from "../../NoContent";

type ListFooterProps = {
    isFetching: boolean,
    noMorePosts: boolean,
}

const ListFooter: React.FC<ListFooterProps> = ({isFetching, noMorePosts}) => {
    if (isFetching) {
        return <ActivityIndicator animating={true} color={BROWN_DARK} size={20} style={{justifyContent: "center", flexGrow: 1}}/>
    }

    if (noMorePosts) {
        <Text>No hay mas publicaciones en este momento</Text>
    }

    return <></>
}

type PostListProps = {
    updatePosts: (page: number) => Promise<ReducedPostType[]>;
    myId: number;
    onRedirectToProfile: (author: PostAuthor) => void;
    onRedirectToDetails: (postId: string) => void;
}

const PostList: React.FC<PostListProps> = ({updatePosts, myId, onRedirectToProfile, onRedirectToDetails}) => {

    const api = useHanagotchiApi();
    const {isFetching, posts, setPosts, error, pageControl, noMorePosts} = usePosts(updatePosts);
   
    const renderItem = useCallback(({item}) => (
        <ReducedPost 
            post={item} 
            myId={myId} 
            onDelete={handleDelete} 
            onRedirectToProfile={onRedirectToProfile}
            onRedirectToDetails={onRedirectToDetails}
            />
      ), []);

    const loadNextPage = useCallback(async () => await pageControl.next(), [pageControl]);
    const resetPages = useCallback(async () => {
        await pageControl.restart();
    }, [pageControl]);

    const handleDelete = async (postId: string) => {
        await api.deletePost(postId);
        setPosts((posts) => posts.filter(p => p.id !== postId));
    }

    if (!posts && isFetching) {
        return <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={{justifyContent: "center", flexGrow: 1}}/>
    }

    if (error !== null) {
        console.log(error);
        return <ErrorPlaceholder />
    }


    return (
            <FlatList 
                data={posts}
                renderItem={renderItem}
                keyExtractor={(item, index) => String(index)}
                contentContainerStyle={{gap: 20}}
                removeClippedSubviews
                refreshControl={
                    <RefreshControl refreshing={isFetching} onRefresh={resetPages} />
                }
                onEndReachedThreshold={0.5}
                onEndReached={loadNextPage}
                ListFooterComponent={<ListFooter isFetching={isFetching} noMorePosts={noMorePosts} />}
                maxToRenderPerBatch={10}
                initialNumToRender={4}
                windowSize={5}
                ItemSeparatorComponent={() => <Divider bold theme={{ colors: { outlineVariant: BEIGE_DARK } }} />}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<NoContent />}
            />
    );
}

export default PostList;