import {StyleSheet, TouchableWithoutFeedback, View} from "react-native"
import {PostAuthor} from "../../../models/Post"
import ProfilePicture from "../../ProfilePicture";
import {Text} from "react-native-paper"
import {BROWN, BROWN_LIGHT} from "../../../themes/globalThemes";
import React from "react";

const sizes = {
    post: 60,
    comment: 50,
}

type AuthorDetailsProp = {
    author: PostAuthor;
    onTouch: (author: PostAuthor) => void;
    size?: "post" | "comment";
}

const AuthorDetails: React.FC<AuthorDetailsProp> = ({author, onTouch, size = "post"}) => {
    return (
        <View style={style.container}>
            <TouchableWithoutFeedback onPress={() => onTouch(author)}>
                <ProfilePicture 
                    uri={author.photo ?? "https://th.bing.com/th/id/OIP.Cl56H6WgxJ8npVqyhefTdQHaHa?rs=1&pid=ImgDetMain"}
                    size={sizes[size]} 
                />
            </TouchableWithoutFeedback>
            <View>
                <Text style={style.name} onPress={() => onTouch(author)}>{author.name?.toUpperCase() ?? "undefined"}</Text>
                <Text style={style.nickname} onPress={() => onTouch(author)}>@{author.nickname ?? "undefined"}</Text>
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

export default React.memo(AuthorDetails);