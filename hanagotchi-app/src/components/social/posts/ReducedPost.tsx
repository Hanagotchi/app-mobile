import { View, StyleSheet } from "react-native"
import { Post } from "../../../models/Post"
import AuthorDetails from "./AuthorDetails"
import { IconButton, Text } from "react-native-paper"
import { BROWN_DARK } from "../../../themes/globalThemes"
import ExpandibleImage from "../../ExpandibleImage"
import { useToggle } from "../../../hooks/useToggle"

type ReducedPostProps = {
    post: Post
}

const ReducedPost: React.FC<ReducedPostProps> = ({post}) => {
    const [like, toggleLike] = useToggle(false);

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
            <View style={style.footer}>
                <View style={style.actions}>
                    <View style={{flexDirection: "row", alignItems: "center", gap: -10}}>
                        <IconButton icon={`thumb-up${like ? "" : "-outline"}`} onPress={toggleLike}/>
                        <Text>{post.likes_count}</Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center", gap: -10}}>
                        <IconButton icon={"comment"} onPress={() => console.log("like!")}/>
                        <Text>0</Text>
                    </View>
                    <IconButton icon={"share-variant"} onPress={() => console.log("like!")}/>
                </View>
                <View style={{justifyContent: "center"}}>
                    <Text>{post.created_at.toLocaleString()}</Text>
                </View>
            </View>
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
    },
    footer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    actions: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    }
});

export default ReducedPost;

