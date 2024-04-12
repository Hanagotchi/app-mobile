import { View, StyleSheet } from "react-native"
import { PostAuthor } from "../../../models/Post"
import defaultProfilePhoto from "../../../assets/defaultProfilePhoto";
import ProfilePicture from "../../ProfilePicture";
import {Text} from "react-native-paper"
import { BROWN, BROWN_LIGHT } from "../../../themes/globalThemes";

type AuthorDetailsProp = {
    author: PostAuthor
}

const AuthorDetails: React.FC<AuthorDetailsProp> = ({author}) => {
    return (
        <View style={style.container}>
            <ProfilePicture uri={author.photo ?? "https://th.bing.com/th/id/OIP.Cl56H6WgxJ8npVqyhefTdQHaHa?rs=1&pid=ImgDetMain"} />
            <View>
                <Text style={style.name}>{author.name?.toUpperCase() ?? "John Doe"}</Text>
                <Text style={style.nickname}>@{author.nickname ?? "johnDoe123"}</Text>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 20,
        alignItems: "center"
    },
    name: {
        color: BROWN,
        fontWeight: "bold",
        fontSize: 14,
    },
    nickname: {
        color: BROWN_LIGHT,
        fontStyle: "italic"
    }
});

export default AuthorDetails;