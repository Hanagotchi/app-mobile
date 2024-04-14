import { View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Post } from "../../../models/Post"
import AuthorDetails from "./AuthorDetails"
import { IconButton, Menu, Text } from "react-native-paper"
import { BROWN_DARK } from "../../../themes/globalThemes"
import ExpandibleImage from "../../ExpandibleImage"
import { useToggle } from "../../../hooks/useToggle"
import React from "react"

type ReducedPostProps = {
    post: Post;
    myId: number;
    onDelete: (postId: string) => void;
}

const ReducedPost: React.FC<ReducedPostProps> = ({post, myId, onDelete}) => {
    const [like, toggleLike] = useToggle(false);
    const [menuOpen, toggleMenu] = useToggle(false);

    const iAmTheAuthor = post.author.id === myId;

    return (
        <TouchableOpacity>
            <View style={style.container}>
                <View style={style.header}>
                    <AuthorDetails author={post.author} />
                    <Menu
                        visible={menuOpen}
                        onDismiss={toggleMenu}
                        anchor={<IconButton icon={"dots-horizontal"} onPress={toggleMenu} />}
                    >
                        {iAmTheAuthor && <Menu.Item title="Eliminar Post" onPress={() => onDelete(post.id)} />}
                        {<Menu.Item title={`id: ${post.id}`} onPress={() => {}} />}
                    </Menu>
                    
                </View>
                <Text style={style.content}>{post.content}</Text>
                {post.photo_links.length > 0 &&(
                    <Image 
                        style={style.image}
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
        </TouchableOpacity>

    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        gap: 15,
        width: "100%",
        alignItems: "center",
    },
    header: {
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%"
    },
    content: {
        color: BROWN_DARK,
        fontSize: 15,
        textAlign: "left",
        alignSelf: "flex-start"
    },
    image: {
        width: "100%",
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

export default React.memo(ReducedPost);

