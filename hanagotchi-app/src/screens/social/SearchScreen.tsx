import { StyleSheet, View, useWindowDimensions } from "react-native";
import { BACKGROUND_COLOR, BEIGE, BROWN_LIGHT, GREEN } from "../../themes/globalThemes";
import { Searchbar } from "react-native-paper";
import { CompositeScreenProps } from "@react-navigation/native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { SocialDrawerList } from "../../navigation/social/SocialDrawer";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { MainTabParamsList, RootStackParamsList } from "../../navigation/Navigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { PostAuthor } from "../../models/Post";
import { useSession } from "../../hooks/useSession";
import { TabView } from "react-native-tab-view";
import SearchResultPostsScreen from "./search_tabs/SearchResultPostsScreen";
import SearchTabBar from "../../components/social/SearchTabBar";

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

    const renderScene = ({ route }) => {
        switch (route.key) {
          case 'first':
            return <SearchResultPostsScreen
                tag={query}
                handleRedirectToDetails={handleRedirectToDetails}
                handleRedirectToProfile={handleRedirectToProfile}
            />;
          case 'second':
            return <View style={{ flex: 1, backgroundColor: '#673ab7' }} />;
          default:
            return null;
        }
      };

    const [query, setQuery] = useState<string>(route.params.initSearch);
    const userId = useSession((state) => state.session!.userId);

    navigation.setOptions({
        headerRight: () => (
            <Searchbar 
                value={query} 
                theme={{ colors: { elevation: {level3: BEIGE} } }}
                onChangeText={(str) => setQuery(str.trim())}
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