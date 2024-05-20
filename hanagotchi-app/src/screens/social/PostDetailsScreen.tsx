import { FlatList, SafeAreaView, StyleSheet, ScrollView } from "react-native"
import { RootStackParamsList } from "../../navigation/Navigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DetailedPost } from "../../components/social/posts/Post";
import { useApiFetch } from "../../hooks/useApiFetch";
import { useHanagotchiApi } from "../../hooks/useHanagotchiApi";
import { Comment as CommentModel, Post, PostAuthor } from "../../models/Post";
import { useSession } from "../../hooks/useSession";
import { useMemo } from "react";
import { ActivityIndicator, Divider, Text } from "react-native-paper";
import { BACKGROUND_COLOR, BEIGE_DARK, BROWN_DARK } from "../../themes/globalThemes";
import Comment from "../../components/home/Comment";

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

    const deleteComment = (commentId: string) => {
        return;
    }

    if (!error && isFetching) {
        return <SafeAreaView style={style.container}>
            <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={{justifyContent: "center", flexGrow: 1}}/>
        </SafeAreaView>
    }

    if (error) throw error;

    const dummyComments: CommentModel[] = [{
        id: "ididididiid",
        author: post?.author,
        content: "ALTO COMENTARIO VIEJAAAAAA",
        created_at: new Date()
    },
    {
        id: "ididididiid",
        author: post?.author,
        content: "ALTO COMENTARIO VIEJAAAAAA",
        created_at: new Date()
    },
    {
        id: "ididididiid",
        author: post?.author,
        content: "ALTO COMENTARIO VIEJAAAAAA",
        created_at: new Date()
    },];

    return (
        <SafeAreaView style={style.container}>
            <ScrollView contentContainerStyle={{gap: 10}}>
                <DetailedPost 
                    post={post!}
                    myId={myId!}
                    onRedirectToProfile={redirectToAuthorProfile}
                    onDelete={deletePost}
                />
                {dummyComments.map(((comment, index) => (<>
                    <Divider bold theme={{ colors: { outlineVariant: BEIGE_DARK } }} />
                    <Comment 
                        comment={comment}
                        key={index} 
                        onRedirectToProfile={redirectToAuthorProfile}
                        onDelete={deleteComment}
                        myId={myId!}
                    />
                    
                </>)))}
            </ScrollView>
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
        gap: 10,
        backgroundColor: BACKGROUND_COLOR,
    },
});

export default PostDetailsScreen;