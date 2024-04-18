import {
    DrawerContentScrollView,
  } from '@react-navigation/drawer';
import { DrawerDescriptorMap, DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { DrawerNavigationState, ParamListBase } from '@react-navigation/native';
import {ActivityIndicator, Drawer, List} from "react-native-paper";
import useMyUser from '../../hooks/useMyUser';
import AuthorDetails from '../../components/social/posts/AuthorDetails';
import { BACKGROUND_COLOR, BROWN, BROWN_DARK, GREEN } from '../../themes/globalThemes';
import { StyleSheet, View } from 'react-native';
import { useHanagotchiApi } from '../../hooks/useHanagotchiApi';
import { useApiFetch } from '../../hooks/useApiFetch';
import { useSession } from '../../hooks/useSession';
import { UserProfile } from '../../models/User';

const drawerItemColor = (color: string) => ({ colors: {
    onSecondaryContainer: color,
    onSurfaceVariant: color,
}});

const mockedTags = ["plantas", "Hola"];

type SidebarContentProps = {
    state: DrawerNavigationState<ParamListBase>;
    navigation: DrawerNavigationHelpers;
    descriptors: DrawerDescriptorMap;
};

const SidebarContent: React.FC<SidebarContentProps> = (props) => {
    const api = useHanagotchiApi();
    const myId = useSession((state) => state.session?.userId);
    const {isFetchingMyUser, myUser} = useMyUser();
    const {
        isFetching: isFetchingUsersProfiles, 
        fetchedData: userProfiles, 
        error
    } = useApiFetch<UserProfile[]>(() => api.getUsersProfiles({follower: myId}), []);

    if (error) {
        throw error
    };

    if (isFetchingMyUser || isFetchingUsersProfiles || !userProfiles || !myUser) {
        return <DrawerContentScrollView {...props} style={style.container}>
            <ActivityIndicator animating={true} color={BROWN_DARK} size={20} style={{justifyContent: "center", flexGrow: 1}}/>
        </DrawerContentScrollView>
    }

    return (
        <DrawerContentScrollView {...props} style={style.container} contentContainerStyle={{width: "101%"}}>
            <View style={{gap: 20}}>
                <AuthorDetails author={{
                    id: myUser.id,
                    name: myUser.name,
                    photo: myUser.photo,
                    nickname: myUser.nickname,
                }}/>
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
                                profileId: myUser!.id,
                                headerTitle: "Mi perfil"
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
                            {mockedTags.map((tag) => (
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
                            {userProfiles.filter(u => u.id !== myId).map((user) => (
                                <Drawer.Item
                                    key={user.id.toString()}
                                    id={user.id.toString()} 
                                    theme={drawerItemColor(BROWN)}
                                    label={user.name ?? ""}
                                    icon="account"
                                    style={style.hashtagItem}
                                    labelMaxFontSizeMultiplier={4}
                                    onPress={() => props.navigation.navigate(
                                        "SocialProfile", 
                                        {
                                            profileId: user.id, 
                                            headerTitle: user.name
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