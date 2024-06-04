import React, { useRef, useState, useEffect, useCallback } from "react";
import { SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import { RootStackParamsList } from "../../navigation/Navigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DetailedPost } from "../../components/social/posts/Post";
import { useApiFetch } from "../../hooks/useApiFetch";
import { useHanagotchiApi } from "../../hooks/useHanagotchiApi";
import { CommentAuthor, Comment as CommentModel, Post, PostAuthor } from "../../models/Post";
import { useSession } from "../../hooks/useSession";
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
  const [commentCount, setCommentCount] = useState<number>(0);
  const hanagotchiApi = useHanagotchiApi();
  const { isFetching, fetchedData: post, error } = useApiFetch<Post | null>(() => hanagotchiApi.getPostById(postId), null, [postId]);

  useEffect(() => {
    if (post && post.comments) {
      setComments(post.comments);
      setCommentCount(post.comments.length);
    }
  }, [post]);

  const redirectToAuthorProfile = useCallback((author: PostAuthor) => {
    navigation.navigate(
      "SocialProfile",
      { profileId: author.id, headerTitle: author.id === myId ? "Mi perfil" : author.name! }
    );
  }, [navigation, myId]);

  const deletePost = useCallback(async () => {
    await hanagotchiApi.deletePost(postId);
    navigation.goBack();
  }, [hanagotchiApi, postId, navigation]);

  const addComment = useCallback(async () => {
    const newReducedComment = await hanagotchiApi.commentPost(postId, comment);
    const me = await hanagotchiApi.getUser(myId!);
    const author: CommentAuthor = {
      id: myId!,
      name: me.name, 
      photo: me.photo,
      nickname: me.nickname
    };
  
    const newComment: CommentModel = {
      ...newReducedComment,
      author: author
    };
    setComments((prevComments) => [...prevComments, newComment]);
    setComment('');
    setCommentCount((prevCount) => prevCount + 1);
    ref.current?.hideDialog();
  }, [hanagotchiApi, comment, postId, myId]);

  const deleteComment = useCallback(async (commentId: string) => {
    await hanagotchiApi.deletePostComment(postId, commentId);
    setComments((prevComments) => prevComments.filter(c => c.id !== commentId));
    setCommentCount((prevCount) => prevCount - 1);
  }, [hanagotchiApi, postId]);

  if (!error && isFetching) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={styles.loader} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Error loading post: {error.message}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Dialog
        ref={ref}
        title={"Agregar comentario"}
        primaryButtonProps={{ onPress: addComment }}
        onDismiss={() => ref.current?.hideDialog()}
        secondaryButtonProps={{ onPress: () => ref.current?.hideDialog() }}
      >
        <View style={styles.dialogContent}>
          <TextInput label="Comentario" value={comment} numberOfLines={2} onChangeText={setComment} />
        </View>
      </Dialog>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {post && (
          <DetailedPost
            post={post}
            myId={myId!}
            onRedirectToProfile={redirectToAuthorProfile}
            onDelete={deletePost}
            commentCount={commentCount}
          />
        )}
        {comments.map((comment) => (
          <View key={comment.id}>
            <View style={styles.commentDivider}>
              <Divider bold theme={{ colors: { outlineVariant: BEIGE_DARK } }} />
            </View>
            <Comment
              postId={postId}
              comment={comment}
              onRedirectToProfile={redirectToAuthorProfile}
              onDelete={() => deleteComment(comment.id)}
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
        onPress={() => ref.current?.showDialog()}
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
  loader: {
    justifyContent: "center",
    flexGrow: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  dialogContent: {
    gap: 10,
  },
  scrollViewContent: {
    gap: 10,
  },
  commentDivider: {
    marginBottom: 10,
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
