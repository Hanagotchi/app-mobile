import { View, StyleSheet } from "react-native"
import { Post } from "../../../models/Post"
import AuthorDetails from "./AuthorDetails"
import { IconButton, Text } from "react-native-paper"

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
            <Text>{post.content}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        borderWidth: 1,
        gap: 20,
        width: "100%"
    },
    header: {
        justifyContent: "space-between",
        flexDirection: "row"
    }
});

export default ReducedPost;

