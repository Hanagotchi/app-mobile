import { FlatList } from "react-native"
import {ReducedPost} from "./Post";
import { ActivityIndicator, Divider, Text } from "react-native-paper";
import { BEIGE_DARK, BROWN_DARK } from "../../../themes/globalThemes";
import { PostAuthor, ReducedPost as ReducedPostType } from "../../../models/Post";
import { useHanagotchiApi } from "../../../hooks/useHanagotchiApi";
import { usePosts } from "../../../hooks/usePosts";
import { useCallback } from "react";

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

    if (error) throw error;

    const loadNextPage = async () => pageControl.next();
    const resetPages = async () => pageControl.restart();

    const handleDelete = async (postId: string) => {
        await api.deletePost(postId);
        setPosts((posts) => posts.filter(p => p.id !== postId));
    }

    if (!error && isFetching) {
        return <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={{justifyContent: "center", flexGrow: 1}}/>
    }


    return (
            <FlatList 
                data={posts}
                renderItem={renderItem}
                keyExtractor={(item, index) => String(index)}
                contentContainerStyle={{gap: 20}}
                removeClippedSubviews
                refreshing={isFetching}
                onRefresh={resetPages}
                onEndReachedThreshold={2}
                onEndReached={loadNextPage}
                ListFooterComponent={<ListFooter isFetching={isFetching} noMorePosts={noMorePosts} />}
                maxToRenderPerBatch={10}
                initialNumToRender={4}
                windowSize={5}
                ItemSeparatorComponent={() => <Divider bold theme={{ colors: { outlineVariant: BEIGE_DARK } }} />}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<Text>No hay publicaciones en este momento</Text>}
            />
    );
}

export default PostList;