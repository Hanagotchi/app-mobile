import { SafeAreaView, StyleSheet } from "react-native"
import { BACKGROUND_COLOR } from "../../themes/globalThemes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../../navigation/Navigator";
import EditPost from "../../components/social/posts/EditPost";
import { PostData, PostDataWithoutAuthorId } from "../../models/Post";
import * as SecureStore from "expo-secure-store";
import { useHanagotchiApi } from "../../hooks/useHanagotchiApi";
import useFirebase from "../../hooks/useFirebase";
import { postPhotoUrl } from "../../contexts/FirebaseContext";

type CreatePostScreenProps = NativeStackScreenProps<RootStackParamsList, "CreatePost">

const CreatePostScreen: React.FC<CreatePostScreenProps> = () => {
    const userId = Number(SecureStore.getItem("userId"));
    const api = useHanagotchiApi();
    const {uploadImage} = useFirebase();

    const handleSubmit = async (postData: PostDataWithoutAuthorId) => {
        const photo_links = await Promise.all(
            postData.photo_links.map(photo => uploadImage(photo, postPhotoUrl(userId)))
        );
        const newPost: PostData = {
            author_user_id: userId,
            content: postData.content,
            photo_links
        };
        api.createPost(newPost);
        
    }

    return (
        <SafeAreaView style={style.container}>
             <EditPost buttonLabel="PUBLICAR" onSubmit={handleSubmit}/>
        </SafeAreaView>
    )
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",
        paddingBottom: 20,
        gap: 20,
        backgroundColor: BACKGROUND_COLOR,
    },
});

export default CreatePostScreen;