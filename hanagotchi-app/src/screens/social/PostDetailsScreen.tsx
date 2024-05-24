import { FlatList, SafeAreaView, StyleSheet, ScrollView } from "react-native"
import { MainTabParamsList, RootStackParamsList } from "../../navigation/Navigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DetailedPost } from "../../components/social/posts/Post";
import { useApiFetch } from "../../hooks/useApiFetch";
import { useHanagotchiApi } from "../../hooks/useHanagotchiApi";
import { Comment as CommentModel, Post, PostAuthor } from "../../models/Post";
import { useSession } from "../../hooks/useSession";
import { useMemo } from "react";
import { ActivityIndicator, Divider, FAB, Text } from "react-native-paper";
import { BACKGROUND_COLOR, BEIGE_DARK, BROWN_DARK, GREEN } from "../../themes/globalThemes";
import Comment from "../../components/social/posts/Comment";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { SocialDrawerList } from "../../navigation/social/SocialDrawer";

//type PostDetailsScreenProps = NativeStackScreenProps<RootStackParamsList, "PostDetails">

type PostDetailsScreenProps = CompositeScreenProps<
    DrawerScreenProps<SocialDrawerList>,
    NativeStackScreenProps<RootStackParamsList, "PostDetails">
>;

const PostDetailsScreen: React.FC<PostDetailsScreenProps> = ({route, navigation}) => {
    const postId = route.params.postId;
    const myId = useSession((state) => state.session?.userId);
    const hanagotchiApi = useHanagotchiApi();
    const {isFetching, fetchedData: post, error} = useApiFetch<Post | null>(() => hanagotchiApi.getPostById(postId), null, [postId])

    const redirectToAuthorProfile = (author: PostAuthor) => {
        navigation.navigate(
            "SocialProfile", 
            {profileId: author.id, headerTitle: author.id === myId ? "Mi perfil" : author.name!}
        )
    };

    const deletePost = () => {
        hanagotchiApi.deletePost(postId)
        navigation.goBack();
    }

    const addComment = () => {
        // TODO: Add coment action
    }

    const deleteComment = (commentId: string) => {
        // TODO: Delete coment action
    }

    if (!error && isFetching) {
        return <SafeAreaView style={style.container}>
            <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={{justifyContent: "center", flexGrow: 1}}/>
        </SafeAreaView>
    }

    if (error) throw error;

    const dummyComments: CommentModel[] = [{
        id: "1",
        author: post?.author,
        content: "ALTO COMENTARIO VIEJAAAAAA",
        created_at: new Date()
    },
    {
        id: "2",
        author: post?.author,
        content: "ALTO COMENTARIO VIEJAAAAAA",
        created_at: new Date()
    },
    {
        id: "3",
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
                {dummyComments.map(((comment) => (<>
                    <Divider bold theme={{ colors: { outlineVariant: BEIGE_DARK } }} />
                    <Comment 
                        comment={comment}
                        key={comment.id} 
                        onRedirectToProfile={redirectToAuthorProfile}
                        onDelete={deleteComment}
                        myId={myId!}
                    />
                </>)))}
            </ScrollView>
            <FAB 
                icon={"comment"} 
                mode="flat" 
                style={style.fab}
                variant="primary"
                size="medium" 
                color={BACKGROUND_COLOR}
                onPress={addComment}
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
        gap: 10,
        backgroundColor: BACKGROUND_COLOR,
    },
    fab: {
        bottom: "4%",
        right: "8%",
        position: 'absolute',
        backgroundColor: GREEN,
        color: BACKGROUND_COLOR,
        borderRadius: 30,
    }
});

export default PostDetailsScreen;