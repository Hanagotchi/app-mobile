import { FlatList, View } from "react-native"
import ReducedPost from "./Post";
import { ActivityIndicator } from "react-native-paper";
import { BROWN_DARK } from "../../../themes/globalThemes";
import useMyUser from "../../../hooks/useMyUser";
import { useMemo, useState } from "react";
import { Post } from "../../../models/Post";
import { useApiFetch } from "../../../hooks/useApiFetch";
import { useHanagotchiApi } from "../../../hooks/useHanagotchiApi";
import { usePosts } from "../../../hooks/usePosts";

type PostListProps = {
    updatePosts: (page: number) => Promise<Post[]>;
}

const PostList: React.FC = () => {

    const api = useHanagotchiApi();
    const {isFetching, posts, error, pageControl} = usePosts((pageNum: number) => api.dummyGetPosts(pageNum, 10));

    //const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    if (error) throw error;
    console.log(posts);

    const onRefresh = async () => {
        pageControl.next()
    };

/*     if (isFetchingMyUser) {
        return <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={{justifyContent: "center", flexGrow: 1}}/>
    } */

    return (
            <FlatList 
                data={posts}
                renderItem={({item}) => <ReducedPost post={item}/>}
                keyExtractor={(item, index) => String(index)}
                contentContainerStyle={{gap: 20}}
                refreshing={isFetching}
                onEndReached={onRefresh}
            />
    );
}

export default PostList;