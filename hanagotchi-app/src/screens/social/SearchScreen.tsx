import { useWindowDimensions } from "react-native";
import { BEIGE } from "../../themes/globalThemes";
import { Searchbar } from "react-native-paper";
import { CompositeScreenProps } from "@react-navigation/native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { SocialDrawerList } from "../../navigation/social/SocialDrawer";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { MainTabParamsList, RootStackParamsList } from "../../navigation/Navigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PostAuthor } from "../../models/Post";
import { useSession } from "../../hooks/useSession";
import { TabView } from "react-native-tab-view";
import SearchResultPostsScreen from "./search_tabs/SearchResultPostsScreen";
import SearchTabBar from "../../components/social/SearchTabBar";
import SearchResultUsersScreen from "./search_tabs/SearchResultUsersScreen";
import { useHanagotchiApi } from "../../hooks/useHanagotchiApi";
import useTimeout from "../../hooks/useTimeout";

type SearchScreenProps = CompositeScreenProps<
    DrawerScreenProps<SocialDrawerList, "Search">,
    CompositeScreenProps<
        BottomTabScreenProps<MainTabParamsList, "SocialNetwork">,
        NativeStackScreenProps<RootStackParamsList>
    >
>;

const SearchScreen: React.FC<SearchScreenProps> = ({route, navigation}) => {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'first', title: 'Publicaciones' },
      { key: 'second', title: 'Usuarios' },
    ]);
    const api = useHanagotchiApi();
    const [query, setQuery] = useState<string>(route.params.initSearch);
    const [search, setSearch] = useState<string>(route.params.initSearch);
    const {start} = useTimeout();
    const userId = useSession((state) => state.session!.userId);

    const updateQuery = (newQuery: string) => {
        start(() => setQuery(newQuery), 500);
        setSearch(newQuery);
    }

    const updatePostList = useCallback((pageNum: number) => {
        if (query.length >= 2) {
            return api.getPostsByTag({
                page: pageNum,
                size: 10,
                tag: query,
            });
        } else {
            return Promise.resolve([]);
        }
    }, [query]);

    const renderScene = useCallback(({ route }) => {
        switch (route.key) {
          case 'first':
            return <SearchResultPostsScreen
                tag={query}
                updatePostList={updatePostList}
                handleRedirectToDetails={handleRedirectToDetails}
                handleRedirectToProfile={handleRedirectToProfile}
            />;
          case 'second':
            return <SearchResultUsersScreen 
                nicknameQuery={query}
                handleRedirectToProfile={handleRedirectToProfile}
            />;
          default:
            return null;
        }
      }, [query]);

    navigation.setOptions({
        headerRight: () => (
            <Searchbar 
                value={search} 
                theme={{ colors: { elevation: {level3: BEIGE} } }}
                onChangeText={(str) => updateQuery(str.trim())}
                style={{
                    marginHorizontal: 20,
                    width: 300,
                    height: "80%",
                    borderRadius: 10,
                }}
                inputStyle={{
                    paddingBottom: 10,
                }}
            />
        ),
        headerTitleStyle: {display: "none"},
    })

    const handleRedirectToProfile = useMemo(() => (author: PostAuthor) => {
        navigation.navigate(
            "SocialProfile", 
            {profileId: author.id, headerTitle: author.id === userId ? "Mi perfil" : author.name!}
        )
    }, [navigation]);
    
    const handleRedirectToDetails = useMemo(() => (postId: string) => {
        navigation.navigate(
            "PostDetails",
            {postId: postId}
        )
    }, [navigation]);

    return <TabView
        lazy
        renderTabBar={SearchTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
    />

}

export default SearchScreen;