import { FlatList } from "react-native"
import ReducedPost from "./Post";
import { ActivityIndicator, Text } from "react-native-paper";
import { BROWN_DARK } from "../../../themes/globalThemes";
import { Post } from "../../../models/Post";
import { useHanagotchiApi } from "../../../hooks/useHanagotchiApi";
import { usePosts } from "../../../hooks/usePosts";
import { PureComponent, useCallback } from "react";




type PostListProps = {
    updatePosts: (page: number) => Promise<Post[]>;
}

const PostList: React.FC = () => {

    const api = useHanagotchiApi();
    const {isFetching, posts, error, pageControl, noMorePosts} = usePosts((pageNum: number) => api.dummyGetPosts(pageNum, 10));

    //const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


    const renderFooter = () => {
        if (isFetching) {
            return <ActivityIndicator animating={true} color={BROWN_DARK} size={20} style={{justifyContent: "center", flexGrow: 1}}/>
        }
    
        if (noMorePosts) {
            <Text>No hay mas publicaciones en este momento</Text>
        }
    
        return <></>
    }

    const renderItem = useCallback(({item}) => (
        <ReducedPost post={item}/>
      ), []);

    if (error) throw error;

    const onRefresh = async () => {
        pageControl.next()
    };

    if (isFetching && posts.length === 0) {
        console.log("hola");
        return <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={{justifyContent: "center", flexGrow: 1}}/>
    }

    console.log(isFetching)

    return (
            <FlatList 
                data={posts}
                renderItem={renderItem}
                keyExtractor={(item, index) => String(index)}
                contentContainerStyle={{gap: 20}}
                removeClippedSubviews
                refreshing={isFetching}
                onEndReachedThreshold={0}
                onEndReached={onRefresh}
                ListFooterComponent={renderFooter}
                maxToRenderPerBatch={10}
                windowSize={10}
            />
    );
}

export default PostList;