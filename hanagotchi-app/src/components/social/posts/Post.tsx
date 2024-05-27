import { View, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native"
import { ReducedPost as ReducedPostType, PostAuthor, Post } from "../../../models/Post"
import AuthorDetails from "./AuthorDetails"
import { Divider, IconButton, Menu, Text } from "react-native-paper"
import { BEIGE, BROWN_DARK, GREEN } from "../../../themes/globalThemes"
import { useToggle } from "../../../hooks/useToggle"
import React from "react"
import ExpandibleImage from "../../ExpandibleImage"
import { useHanagotchiApi } from "../../../hooks/useHanagotchiApi"

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
    postId: string;
    isLikedByMe: boolean;
    likeCount: number;
    commentCount: number;
}

const PostActions: React.FC<PostActionsProps> = ({postId, isLikedByMe, likeCount, commentCount}) => {
    const [like, toggleLike] = useToggle(isLikedByMe);
    const api = useHanagotchiApi();

    const handlePressLike = async () => {
        if (like) await api.unlikePost(postId);
        else await api.likePost(postId);
        toggleLike()
    }

    return (
        <View style={style.actions}>
            <View style={{flexDirection: "row", alignItems: "center", gap: -10}}>
                <IconButton icon={`thumb-up${like ? "" : "-outline"}`} onPress={handlePressLike}/>
                <Text>{likeCount}</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: "center", gap: -10}}>
                <IconButton icon={"comment"}/>
                <Text>{commentCount}</Text>
            </View>
            <IconButton icon={"share-variant"} onPress={() => console.log("like!")}/>
        </View>
    );
}

type PostFooterProps = {
    postId: string;
    isLikedByMe: boolean;
    likeCount: number;
    commentCount: number;
    createdAt: Date;
}

const PostFooter: React.FC<PostFooterProps> = ({postId, isLikedByMe, likeCount, commentCount, createdAt}) => {
    return (
        <View style={style.footer}>
            <PostActions postId={postId} isLikedByMe={isLikedByMe} likeCount={likeCount} commentCount={commentCount}/>
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
    onRedirectToDetails: (postId: string) => void;
    onDelete: (postId: string) => void;
}

export const ReducedPost: React.FC<ReducedPostProps> = ({post, myId, onDelete, onRedirectToProfile, onRedirectToDetails}) => {
    return (
        <TouchableOpacity onPress={() => onRedirectToDetails(post.id)}>
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
                <PostFooter 
                    postId={post.id}
                    isLikedByMe={true}
                    likeCount={post.likes_count}
                    commentCount={post.comments_count ?? 0}
                    createdAt={post.created_at}
                />
            </View>
        </TouchableOpacity>

    )
}

type DetailedPostProps = {
    post: Post;
    myId: number;
    onRedirectToProfile: (author: PostAuthor) => void;
    onDelete: (postId: string) => void;
}

export const DetailedPost: React.FC<DetailedPostProps> = ({post, myId, onDelete, onRedirectToProfile}) => {

    const displayImages = () => {
        switch (post.photo_links.length) {
            case 0:
                return <></>;
            case 1:
                return <View style={{height: 240}}>
                    <ExpandibleImage 
                        minimizedImageStyle={{...style.image, width: 340}}
                        maximizedImageStyle={style.fullImage}
                        source={{uri: post.photo_links[0]}} 
                    />
                </View>
            default:
                return <View style={{height: 240}}>
                    <FlatList
                        horizontal
                        data={post.photo_links}
                        renderItem={({item}) =>
                            <ExpandibleImage
                                minimizedImageStyle={{...style.image, width: 340}}
                                maximizedImageStyle={style.fullImage}
                                source={{uri: item}}
                            />
                        }
                        keyExtractor={(item, index) => String(index)}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={style.photoList}
                    />
                </View>
        }
    }

    return (
        <View style={style.container}>
            <PostHeader 
                myId={myId}
                postId={post.id}
                author={post.author}
                onDelete={onDelete}
                onRedirectToProfile={onRedirectToProfile}
            />
            <Text style={style.content}>{post.content}</Text>
            {displayImages()}
            <PostFooter 
                postId={post.id}
                isLikedByMe={true}
                likeCount={post.likes_count}
                commentCount={post.comments_count ?? 0}
                createdAt={post.created_at}
            />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
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
        fontSize: 20,
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
        height: "100%",
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
    },
    photoList: {
        paddingHorizontal: "10%",
        gap: 20,
    },
});

