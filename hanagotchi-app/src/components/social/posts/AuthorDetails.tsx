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
    style_name?: any;
    style_nickname?: any;
    size?: "post" | "comment";
}

const AuthorDetails: React.FC<AuthorDetailsProp> = ({author, onTouch, style_name, style_nickname, size = "post"}) => {

    return (
        <View style={style.container} onTouchEnd={() => onTouch(author)}>
            <ProfilePicture 
                uri={author.photo ?? "https://th.bing.com/th/id/OIP.Cl56H6WgxJ8npVqyhefTdQHaHa?rs=1&pid=ImgDetMain"}
                size={sizes[size]} 
            />
            <View>
                <Text style={{...style_name, ...style.name}} >{author.name ?? "undefined"}</Text>
                <Text style={{...style_nickname, ...style.nickname}} >@{author.nickname ?? "undefined"}</Text>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
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