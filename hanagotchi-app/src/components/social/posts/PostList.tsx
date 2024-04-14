import { FlatList } from "react-native"
import ReducedPost from "./Post";
import { ActivityIndicator, Text } from "react-native-paper";
import { BROWN_DARK } from "../../../themes/globalThemes";
import { Post } from "../../../models/Post";
import { useHanagotchiApi } from "../../../hooks/useHanagotchiApi";
import { usePosts } from "../../../hooks/usePosts";
import { useCallback } from "react";
import * as SecureStore from "expo-secure-store";
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
    updatePosts: (page: number) => Promise<Post[]>;
}

const PostList: React.FC = () => {

    const api = useHanagotchiApi();
    const {isFetching, posts, setPosts, error, pageControl, noMorePosts} = usePosts((pageNum: number) => api.dummyGetPosts(pageNum, 10));
    const userId = Number(SecureStore.getItem("userId"));

    const renderItem = useCallback(({item}) => (
        <ReducedPost post={item} myId={userId} onDelete={handleDelete}/>
      ), []);

    if (error) throw error;

    const loadNextPage = async () => pageControl.next();
    const resetPages = async () => pageControl.restart();

    const handleDelete = async (postId: string) => {
        await api.deletePost(postId);
        setPosts((posts) => posts.filter(p => p.id !== postId));
    }

    if (!error && posts.length === 0) {
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
            />
    );
}

export default PostList;