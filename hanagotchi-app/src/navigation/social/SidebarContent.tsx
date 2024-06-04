import {
    DrawerContentScrollView,
  } from '@react-navigation/drawer';
import { DrawerDescriptorMap, DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { DrawerNavigationState, ParamListBase } from '@react-navigation/native';
import {ActivityIndicator, Drawer, List} from "react-native-paper";
import AuthorDetails from '../../components/social/posts/AuthorDetails';
import { BACKGROUND_COLOR, BROWN, BROWN_DARK, GREEN } from '../../themes/globalThemes';
import { StyleSheet, View } from 'react-native';
import { useHanagotchiApi } from '../../hooks/useHanagotchiApi';
import { useSession } from '../../hooks/useSession';
import { UserProfile } from '../../models/User';
import { PostAuthor } from '../../models/Post';
import useMyProfile from '../../hooks/useMyProfile';
import { useApiFetch } from '../../hooks/useApiFetch';


const drawerItemColor = (color: string) => ({ colors: {
    onSecondaryContainer: color,
    onSurfaceVariant: color,
}});


type SidebarContentProps = {
    state: DrawerNavigationState<ParamListBase>;
    navigation: DrawerNavigationHelpers;
    descriptors: DrawerDescriptorMap;
};

const SidebarContent: React.FC<SidebarContentProps> = (props) => {
    const api = useHanagotchiApi();
    const myId = useSession((state) => state.session?.userId);
    const {isFetchingMyProfile, myProfile } = useMyProfile();
    const {
        isFetching: isFetchingUsersProfiles, 
        fetchedData: userProfiles, 
        setFetchedData,
        error
    } = useApiFetch<UserProfile[]>(() => api.getFollowing({user_id: myId}), []);
    if (error) {
        throw error
    };

    const handleUnfollowUser = (userId: number) => {
        if (!userProfiles.find(u => u._id === userId)) {
            return;
        }
        setFetchedData(userProfiles.filter(u => u._id !== userId));
    }

    const handleFollowUser = async (userId: number) => {
        const user = await api.getUserProfile(userId);
        userProfiles.concat(user);
        setFetchedData(userProfiles);
    }

    if (isFetchingMyProfile || isFetchingUsersProfiles || !userProfiles || !myProfile) {
            return <DrawerContentScrollView {...props} style={style.container}>
            <ActivityIndicator animating={true} color={BROWN_DARK} size={20} style={{justifyContent: "center", flexGrow: 1}}/>
        </DrawerContentScrollView>
    }
    
    return (
        <DrawerContentScrollView {...props} style={style.container} contentContainerStyle={{width: "101%"}}>
            <View style={{gap: 20}}>
                <AuthorDetails 
                    author={{
                        id: myProfile._id,
                        name: myProfile.name,
                        photo: myProfile.photo,
                        nickname: myProfile.nickname,
                    }}
                    onTouch={(me: PostAuthor) => props.navigation.navigate("SocialProfile", {
                        profileId: myProfile!._id,
                        headerTitle: "Mi perfil",
                        handleFollowUser: handleFollowUser,
                        handleUnfollowUser: handleUnfollowUser,
                    })}
                />
                <View>
                    <Drawer.Item 
                        theme={drawerItemColor(GREEN)}
                        label='PRINCIPAL'
                        icon="leaf"
                        style={style.mainItem}
                        onPress={() => props.navigation.navigate("Feed")}
                    />
                    <Drawer.Item 
                        theme={drawerItemColor(GREEN)}
                        label='MI PERFIL'
                        icon="account"
                        style={style.mainItem}
                        onPress={() => props.navigation.navigate(
                            "SocialProfile", 
                            {
                                profileId: myProfile!._id,
                                headerTitle: "Mi perfil",
                                handleFollowUser: handleFollowUser,
                                handleUnfollowUser: handleUnfollowUser,
                            }
                        )}
                    />
                    <List.AccordionGroup>
                        <List.Accordion 
                            title="MIS TAGS" 
                            id={1} 
                            theme={{ colors: {
                                onSurfaceVariant: GREEN,
                            }}}
                            titleStyle={{
                                color: GREEN,
                                fontWeight: "bold"
                            }}
                            style={{gap: 0}}
                        >
                            {myProfile.tags.map((tag) => (
                                <Drawer.Item
                                    key={tag}
                                    id={tag} 
                                    theme={drawerItemColor(BROWN)}
                                    label={`#${tag}`}
                                    style={style.hashtagItem}
                                    onPress={() => console.log("Navigate to tag search")}
                                />  
                            ))}
                        </List.Accordion>
                        <List.Accordion 
                            title="SEGUIDOS" 
                            id={2} 
                            theme={{ colors: {
                                onSurfaceVariant: GREEN,
                            }}}
                            titleStyle={{
                                color: GREEN,
                                fontWeight: "bold"
                            }}
                            style={{gap: 0}}
                            
                            
                        >
                            {userProfiles.filter(u => u._id !== myId).map((user) => (
                                <Drawer.Item
                                    key={user._id.toString()}
                                    id={user._id.toString()} 
                                    theme={drawerItemColor(BROWN)}
                                    label={user.name ?? ""}
                                    icon="account"
                                    style={style.hashtagItem}
                                    labelMaxFontSizeMultiplier={4}
                                    onPress={() => props.navigation.navigate(
                                        "SocialProfile", 
                                        {
                                            profileId: user._id, 
                                            headerTitle: user.name,
                                            handleFollowUser: handleFollowUser,
                                            handleUnfollowUser: handleUnfollowUser,
                                        }
                                    )}
                                />
                            ))}
                        </List.Accordion>
                    </List.AccordionGroup>
                </View>
            </View>
        </DrawerContentScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: BACKGROUND_COLOR,
    },
    mainItem: {
        marginHorizontal: 0,
        marginLeft: 0,
        marginRight: 0,
        height: 45
    },
    hashtagItem:  {
        marginHorizontal: 0,
        marginLeft: 10,
        marginRight: 0,
        height: 40,
    }
})


export default SidebarContent;