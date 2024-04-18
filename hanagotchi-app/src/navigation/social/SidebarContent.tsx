import {
    DrawerContentScrollView,
  } from '@react-navigation/drawer';
import { DrawerDescriptorMap, DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { DrawerNavigationState, ParamListBase } from '@react-navigation/native';
import {ActivityIndicator, Drawer, DrawerItem} from "react-native-paper";
import useMyUser from '../../hooks/useMyUser';
import AuthorDetails from '../../components/social/posts/AuthorDetails';
import { BACKGROUND_COLOR, BROWN_DARK, GREEN } from '../../themes/globalThemes';
import { StyleSheet, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

type SidebarContentProps = {
    state: DrawerNavigationState<ParamListBase>;
    navigation: DrawerNavigationHelpers;
    descriptors: DrawerDescriptorMap;
};

const SidebarContent: React.FC<SidebarContentProps> = (props) => {
    const {isFetchingMyUser, myUser} = useMyUser()

    if (isFetchingMyUser || !myUser) {
        return 
    }

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
                        style={style.item}
                    />
                    <Drawer.Item 
                        theme={{ colors: {
                            onSecondaryContainer: GREEN,
                            onSurfaceVariant: GREEN,
                        }}}
                        label='PERFIL'
                        icon="account"
                        style={style.item}
                    />
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
    item: {
        marginHorizontal: 0,
        marginLeft: 0,
        marginRight: 0,
    }
})


export default SidebarContent;