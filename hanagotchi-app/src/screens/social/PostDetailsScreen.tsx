import { SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import { RootStackParamsList } from "../../navigation/Navigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DetailedPost } from "../../components/social/posts/Post";
import { useApiFetch } from "../../hooks/useApiFetch";
import { useHanagotchiApi } from "../../hooks/useHanagotchiApi";
import { Comment as CommentModel, Post, PostAuthor } from "../../models/Post";
import { useSession } from "../../hooks/useSession";
import { useRef, useState, useEffect } from "react";
import { ActivityIndicator, Divider, FAB, Text } from "react-native-paper";
import { BACKGROUND_COLOR, BEIGE_DARK, BROWN_DARK, GREEN } from "../../themes/globalThemes";
import Comment from "../../components/social/posts/Comment";
import { CompositeScreenProps } from "@react-navigation/native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { SocialDrawerList } from "../../navigation/social/SocialDrawer";
import Dialog, { DialogRef } from "../../components/Dialog";
import TextInput from "../../components/TextInput";

type PostDetailsScreenProps = CompositeScreenProps<
  DrawerScreenProps<SocialDrawerList>,
  NativeStackScreenProps<RootStackParamsList, "PostDetails">
>;

const PostDetailsScreen: React.FC<PostDetailsScreenProps> = ({ route, navigation }) => {
  const postId = route.params.postId;
  const ref = useRef<DialogRef>(null);
  const myId = useSession((state) => state.session?.userId);
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<CommentModel[]>([]);
  const hanagotchiApi = useHanagotchiApi();
  const { isFetching, fetchedData: post, error } = useApiFetch<Post | null>(() => hanagotchiApi.getPostById(postId), null, [postId]);

  useEffect(() => {
    if (post && post.comments) {
      setComments(post.comments);
    }
  }, [post]);

  const redirectToAuthorProfile = (author: PostAuthor) => {
    navigation.navigate(
      "SocialProfile",
      { profileId: author.id, headerTitle: author.id === myId ? "Mi perfil" : author.name! }
    );
  };

  const deletePost = () => {
    hanagotchiApi.deletePost(postId);
    navigation.goBack();
  };

  const addComment = async () => {
    const newComment = await hanagotchiApi.commentPost(postId, comment);
    setComments([...comments, newComment]);
    setComment('');
    ref.current?.hideDialog();
  };

  const deleteComment = async (postId: string, commentId: string) => {
    await hanagotchiApi.deletePostComment(postId, commentId);
    setComments(comments.filter(c => c.id !== commentId));
  };

  if (!error && isFetching) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={{ justifyContent: "center", flexGrow: 1 }} />
      </SafeAreaView>
    );
  }

  if (error) throw error;

  return (
    <SafeAreaView style={styles.container}>
      <Dialog
        ref={ref}
        title={"Agregar comentario"}
        primaryButtonProps={{ onPress: (async () => { await addComment() }) }}
        onDismiss={() => ref.current?.hideDialog()}
        secondaryButtonProps={{ onPress: () => { ref.current?.hideDialog() } }}
      >
        <View style={{ gap: 10 }}>
          <TextInput label="Comentario" value={comment} onChangeText={(text) => setComment(text)} />
        </View>
      </Dialog>
      <ScrollView contentContainerStyle={{ gap: 10 }}>
        <DetailedPost
          post={post!}
          myId={myId!}
          onRedirectToProfile={redirectToAuthorProfile}
          onDelete={deletePost}
        />
        {comments.map((comment) => (
          <View key={comment.id}>
            <View style={{ marginBottom: 10 }}>
              <Divider bold theme={{ colors: { outlineVariant: BEIGE_DARK } }} />
            </View>
            <Comment
              postId={postId}
              comment={comment}
              onRedirectToProfile={redirectToAuthorProfile}
              onDelete={() => deleteComment(postId, comment.id)}
              myId={myId!}
            />
          </View>
        ))}
      </ScrollView>
      <FAB
        icon={"comment"}
        mode="flat"
        style={styles.fab}
        variant="primary"
        size="medium"
        color={BACKGROUND_COLOR}
        onPress={() => { ref.current?.showDialog() }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
