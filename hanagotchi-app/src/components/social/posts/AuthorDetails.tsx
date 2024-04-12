import { View, StyleSheet } from "react-native"
import { PostAuthor } from "../../../models/Post"
import defaultProfilePhoto from "../../../assets/defaultProfilePhoto";
import ProfilePicture from "../../ProfilePicture";
import {Text} from "react-native-paper"

type AuthorDetailsProp = {
    author: PostAuthor
}

const AuthorDetails: React.FC<AuthorDetailsProp> = ({author}) => {
    return (
        <View style={style.container}>
            <ProfilePicture uri={author.photo ?? "https://th.bing.com/th/id/OIP.Cl56H6WgxJ8npVqyhefTdQHaHa?rs=1&pid=ImgDetMain"} />
            <View>
                <Text>{author.name?.toUpperCase() ?? "John Doe"}</Text>
                <Text>@{author.nickname ?? "johnDoe123"}</Text>

            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 20,
        alignItems: "center"
    }    
});

export default AuthorDetails;