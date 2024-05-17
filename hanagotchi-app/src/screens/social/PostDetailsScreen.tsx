import { SafeAreaView, StyleSheet } from "react-native"
import { RootStackParamsList } from "../../navigation/Navigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DetailedPost } from "../../components/social/posts/Post";
import { useApiFetch } from "../../hooks/useApiFetch";
import { useHanagotchiApi } from "../../hooks/useHanagotchiApi";
import { Post, PostAuthor } from "../../models/Post";
import { useSession } from "../../hooks/useSession";
import { useMemo } from "react";
import { ActivityIndicator } from "react-native-paper";
import { BACKGROUND_COLOR, BROWN_DARK } from "../../themes/globalThemes";

type PostDetailsScreenProps = NativeStackScreenProps<RootStackParamsList, "PostDetails">

const PostDetailsScreen: React.FC<PostDetailsScreenProps> = ({route, navigation}) => {
    const postId = route.params.postId;
    const myId = useSession((state) => state.session?.userId);
    const hanagotchiApi = useHanagotchiApi();
    const {isFetching, fetchedData: post, error} = useApiFetch<Post | null>(() => hanagotchiApi.getPostById(postId), null, [postId])

    const redirectToAuthorProfile = useMemo(() => {
/*         if (post) {
            return () => navigation.navigate(
                "SocialProfile", 
                {
                    profileId: post.author.id,
                    headerTitle: post.author.name!
                }
            )
        } */
        return (author: PostAuthor) => {}
    }, [post])

    const deletePost = () => {
        hanagotchiApi.deletePost(postId)
        navigation.goBack();
    }

    if (!error && isFetching) {
        return <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={{justifyContent: "center", flexGrow: 1}}/>
    }

    return (
        <SafeAreaView style={style.container}>
            <DetailedPost 
                post={post!}
                myId={myId!}
                onRedirectToProfile={redirectToAuthorProfile}
                onDelete={deletePost}
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
        paddingHorizontal: "5%",
        gap: 10,
        backgroundColor: BACKGROUND_COLOR,
    },
});

export default PostDetailsScreen;