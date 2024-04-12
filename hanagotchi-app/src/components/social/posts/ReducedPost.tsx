import { View } from "react-native"
import { Post } from "../../../models/Post"
import AuthorDetails from "./AuthorDetails"

type ReducedPostProps = {
    post: Post
}

const ReducedPost: React.FC<ReducedPostProps> = ({post}) => {
    return <View>
        <AuthorDetails author={post.author} />
    </View>
}

export default ReducedPost;