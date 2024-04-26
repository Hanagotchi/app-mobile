import { View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { ReducedPost as ReducedPostType, PostAuthor } from "../../../models/Post"
import AuthorDetails from "./AuthorDetails"
import { IconButton, Menu, Text } from "react-native-paper"
import { BEIGE, BROWN_DARK, GREEN } from "../../../themes/globalThemes"
import { useToggle } from "../../../hooks/useToggle"
import React from "react"

type PostHeaderProps = {
    myId: number;
    postId: string;
    author: PostAuthor;
    onRedirectToProfile: (author: PostAuthor) => void;
    onDelete: (postId: string) => void;
}

const PostHeader: React.FC<PostHeaderProps> = ({myId, postId, author, onDelete, onRedirectToProfile}) => {
    const [menuOpen, toggleMenu] = useToggle(false);
    const iAmTheAuthor = author.id === myId;

    const handleDelete = () => {
        onDelete(postId);
        toggleMenu();
    }

    return (
        <View style={style.header}>
            <AuthorDetails onTouch={onRedirectToProfile} author={author} />
            <Menu
                visible={menuOpen}
                onDismiss={toggleMenu}
                anchor={<IconButton icon={"dots-horizontal"} onPress={toggleMenu} />}
                contentStyle={style.menu}
            >
                {iAmTheAuthor && <Menu.Item
                titleStyle={style.itemTitle} 
                title="ELIMINAR POST" 
                onPress={handleDelete}
                style={{minWidth: "50%"}} 
                />}
                <Menu.Item 
                    title={`Id: ${postId}`} 
                />
            </Menu>
        </View>
    );
};

type PostActionsProps = {
    likeCount: number;
}

const PostActions: React.FC<PostActionsProps> = ({likeCount}) => {
    const [like, toggleLike] = useToggle(false);

    return (
        <View style={style.actions}>
            <View style={{flexDirection: "row", alignItems: "center", gap: -10}}>
                <IconButton icon={`thumb-up${like ? "" : "-outline"}`} onPress={toggleLike}/>
                <Text>{likeCount}</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: "center", gap: -10}}>
                <IconButton icon={"comment"} onPress={() => console.log("like!")}/>
                <Text>0</Text>
            </View>
            <IconButton icon={"share-variant"} onPress={() => console.log("like!")}/>
        </View>
    );
}

type PostFooterProps = {
    likeCount: number;
    createdAt: Date;
}

const PostFooter: React.FC<PostFooterProps> = ({likeCount, createdAt}) => {
    return (
        <View style={style.footer}>
            <PostActions likeCount={likeCount}/>
            <View style={{justifyContent: "center"}}>
                <Text style={{color: GREEN}}>{createdAt.toLocaleString()}</Text>
            </View>
        </View>
    );
}

type ReducedPostProps = {
    post: ReducedPostType;
    myId: number;
    onRedirectToProfile: (author: PostAuthor) => void;
    onDelete: (postId: string) => void;
}

const ReducedPost: React.FC<ReducedPostProps> = ({post, myId, onDelete, onRedirectToProfile}) => {
    return (
        <TouchableOpacity>
            <View style={style.container}>
                <PostHeader 
                    myId={myId}
                    postId={post.id}
                    author={post.author}
                    onDelete={onDelete}
                    onRedirectToProfile={onRedirectToProfile}
                />
                <Text style={style.content}>{post.content}</Text>
                {post.main_photo_link &&(
                    <Image 
                        style={style.image}
                        source={{uri: post.main_photo_link}} 
                    />
                )}
                <PostFooter likeCount={post.likes_count} createdAt={post.created_at}/>
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
    menu: {
        backgroundColor: BEIGE,
        alignItems: "center",
        borderRadius: 12,
    },
    itemTitle: {
        color: BROWN_DARK,
        fontWeight: "bold"
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

