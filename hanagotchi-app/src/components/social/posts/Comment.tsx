import { View, StyleSheet } from "react-native"
import { Text } from "react-native-paper";
import AuthorDetails from "./AuthorDetails";
import { CommentAuthor, Comment as CommentModel, PostAuthor } from "../../../models/Post";

import { IconButton, Menu } from "react-native-paper";
import { useToggle } from "../../../hooks/useToggle";
import { BEIGE, BROWN_DARK, GREEN } from "../../../themes/globalThemes";

type CommentHeaderProps = {
    myId: number;
    commentId: string;
    author: CommentAuthor;
    onRedirectToProfile: (author: PostAuthor) => void;
    onDelete: (postId: string) => void;
}

const CommentHeader: React.FC<CommentHeaderProps> = ({myId, commentId, author, onDelete, onRedirectToProfile}) => {
    const [menuOpen, toggleMenu] = useToggle(false);
    const iAmTheAuthor = author.id === myId;

    const handleDelete = () => {
        onDelete(commentId);
        toggleMenu();
    }

    return (
        <View style={style.header}>
            <AuthorDetails onTouch={onRedirectToProfile} author={author} size="comment"/>
            <Menu
                visible={menuOpen}
                onDismiss={toggleMenu}
                anchor={<IconButton icon={"dots-horizontal"} onPress={toggleMenu} />}
                contentStyle={style.menu}
            >
                {iAmTheAuthor && <Menu.Item
                titleStyle={style.itemTitle} 
                title="ELIMINAR COMENTARIO"
                onPress={handleDelete}
                style={{minWidth: "50%"}} 
                />}
                <Menu.Item 
                    title={`Id: ${commentId}`} 
                />
            </Menu>
        </View>
    );
};

type CommentActionsProps = {
    likeCount: number;
}

const CommentActions: React.FC<CommentActionsProps> = ({likeCount}) => {
    const [like, toggleLike] = useToggle(false);

    return (
        <View style={style.actions}>
            <View style={{flexDirection: "row", alignItems: "center", gap: -10}}>
                <IconButton icon={`thumb-up${like ? "" : "-outline"}`} onPress={toggleLike}/>
                <Text>{likeCount}</Text>
            </View>
        </View>
    );
}

type CommentFooterProps = {
    createdAt: Date;
}

const CommentFooter: React.FC<CommentFooterProps> = ({createdAt}) => {
    return (
        <View style={style.footer}>
            <View style={{justifyContent: "center"}}>
                <Text style={{color: GREEN}}>{createdAt.toLocaleString()}</Text>
            </View>
        </View>
    );
}

type CommentProps = {
    myId: number,
    comment: CommentModel;
    onRedirectToProfile: (author: PostAuthor) => void;
    onDelete: (postId: string) => void;
}

const Comment: React.FC<CommentProps> = ({myId, comment, onRedirectToProfile, onDelete}) => {
    return <View style={style.container}>
        <CommentHeader 
            myId={myId}
            commentId={comment.id}
            author={comment.author}
            onRedirectToProfile={onRedirectToProfile}
            onDelete={onDelete}
        />
        <Text style={style.content}>{comment.content}</Text>
        <CommentFooter createdAt={comment.created_at}/>
    </View>
}

const style = StyleSheet.create({
    container: {
        width: "100%",
        gap: 10,
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
    footer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    actions: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
});

export default Comment;