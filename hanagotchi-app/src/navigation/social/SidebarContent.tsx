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
import { Entypo } from '@expo/vector-icons';

type SidebarContentProps = {
    state: DrawerNavigationState<ParamListBase>;
    navigation: DrawerNavigationHelpers;
    descriptors: DrawerDescriptorMap;
};

const mockedTags = ["plantas", "Hola"];
const mockedUsers = ["Federico Pacheco", "Sofia Feijoo", "Violeta Perez Andrade"]

const SidebarContent: React.FC<SidebarContentProps> = (props) => {
    const {isFetchingMyUser, myUser} = useMyUser()

    if (isFetchingMyUser || !myUser) {
        return 
    }

    const brownTheme = { colors: {
        onSecondaryContainer: BROWN,
        onSurfaceVariant: BROWN,
    }}

    return (
        <DrawerContentScrollView {...props} style={style.container}>
            {isFetchingMyUser
            ? <ActivityIndicator animating={true} color={BROWN_DARK} size={20} style={{justifyContent: "center", flexGrow: 1}}/>
            : (<View style={{gap: 20}}>
                <AuthorDetails author={{
                    id: myUser.id,
                    name: myUser.name,
                    photo: myUser.photo,
                    nickname: myUser.nickname,
                }}/>
                <View>
                    <Drawer.Item 
                        theme={{ colors: {
                            onSecondaryContainer: GREEN,
                            onSurfaceVariant: GREEN,
                        }}}
                        label='PRINCIPAL'
                        icon="leaf"
                        style={style.mainItem}
                    />
                    <Drawer.Item 
                        theme={{ colors: {
                            onSecondaryContainer: GREEN,
                            onSurfaceVariant: GREEN,
                        }}}
                        label='MI PERFIL'
                        icon="account"
                        style={style.mainItem}
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
                                    id={tag} 
                                    theme={brownTheme}
                                    label={`#${tag}`}
                                    style={style.hashtagItem}
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
                            {mockedUsers.map((name) => (
                                <Drawer.Item 
                                    theme={brownTheme}
                                    label={name}
                                    icon="account"
                                    style={style.hashtagItem}
                                />
                            ))}
                        </List.Accordion>
                    </List.AccordionGroup>
                </View>
            </View>)}
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