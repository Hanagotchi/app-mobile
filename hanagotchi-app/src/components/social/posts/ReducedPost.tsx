import { View, StyleSheet } from "react-native"
import { Post } from "../../../models/Post"
import AuthorDetails from "./AuthorDetails"
import { IconButton, Text } from "react-native-paper"
import { BROWN_DARK } from "../../../themes/globalThemes"
import ExpandibleImage from "../../ExpandibleImage"

type ReducedPostProps = {
    post: Post
}

const ReducedPost: React.FC<ReducedPostProps> = ({post}) => {
    return (
        <View style={style.container}>
            <View style={style.header}>
                <AuthorDetails author={post.author} />
                <IconButton icon={"dots-horizontal"} onPress={() => console.log("options!")}/>
            </View>
            <Text style={style.content}>{post.content}</Text>
            {post.photo_links.length > 0 &&(
                <ExpandibleImage 
                    minimizedImageStyle={style.image}
                    maximizedImageStyle={style.fullImage} 
                    source={{uri: post.photo_links[0]}} 
                />
            )}
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        borderWidth: 1,
        gap: 20,
        width: "100%",
        flexBasis: "auto",
        alignItems: "center"
    },
    header: {
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%"
    },
    content: {
        color: BROWN_DARK,
        fontSize: 15,
    },
    image: {
        width: 320,
        height: 240,
        borderRadius: 12,
    },
    fullImage: {
        width: 320,
        height: 300,
        borderRadius: 12,
    }
});

export default ReducedPost;

