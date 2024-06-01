import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { BACKGROUND_COLOR, BROWN_DARK } from "../../../themes/globalThemes";
import { ActivityIndicator } from "react-native-paper";
import { useApiFetch } from "../../../hooks/useApiFetch";
import { UserProfile } from "../../../models/User";
import { useHanagotchiApi } from "../../../hooks/useHanagotchiApi";
import { useSession } from "../../../hooks/useSession";
import NoContent from "../../../components/NoContent";
import ErrorPlaceholder from "../../../components/ErrorPlaceholder";
import { useCallback } from "react";
import AuthorDetails from "../../../components/social/posts/AuthorDetails";
import { PostAuthor } from "../../../models/Post";

type SearchResultUsersScreenProps = {
    nicknameQuery: string
    handleRedirectToProfile: (author: PostAuthor) => void;
}

const SearchResultUsersScreen: React.FC<SearchResultUsersScreenProps> = ({nicknameQuery, handleRedirectToProfile}) => {
    const api = useHanagotchiApi();
    const {
        isFetching, 
        fetchedData: userProfiles, 
        error
    } = useApiFetch<UserProfile[]>(() => api.getUsersProfiles({q: nicknameQuery}), [], [nicknameQuery]);

    if (isFetching) {
        return (
            <SafeAreaView style={style.container}>
                <ActivityIndicator
                    animating={true}
                    color={BROWN_DARK}
                    size={80}
                    style={{justifyContent: "center", flexGrow: 1}}
                />
            </SafeAreaView>
        );
    }

    const renderItem = ({item}) => {
        const profile: PostAuthor = {
            id: item.id,
            name: item.name,
            photo: item.photo,
            nickname: item.nickname,
        };
        return (
            <AuthorDetails 
                author={profile}
                onTouch={() => handleRedirectToProfile(profile)}
            />
        )
    }

    if (error !== null) {
        return (
            <SafeAreaView style={style.container}>
                <ErrorPlaceholder />
            </SafeAreaView>
        );
    }

    if (userProfiles.length === 0) {
        return (
            <SafeAreaView style={style.container}>
                <NoContent />
            </SafeAreaView>
        );
    }

    return <SafeAreaView style={style.container}>
        <FlatList 
            data={userProfiles}
            renderItem={renderItem}
            keyExtractor={(item, index) => String(index)}
            contentContainerStyle={{gap: 10, width: "100%"}}
            style={{width: "100%"}}
        />
    </SafeAreaView>
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: "5%",
        gap: 20,
        backgroundColor: BACKGROUND_COLOR,
        width: "100%",
    }
});

export default SearchResultUsersScreen;