import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FeedScreen from "../../screens/social/FeedScreen";
import { MainTabParamsList, RootStackParamsList } from "../Navigator";
import SidebarContent from "./SidebarContent";
import { BEIGE, BEIGE_LIGHT, BLACK } from "../../themes/globalThemes";
import {StyleSheet, View} from "react-native" 
import SocialProfileScreen from "../../screens/social/SocialProfileScreen";
import { IconButton } from "react-native-paper";
import SearchScreen from "../../screens/social/SearchScreen";

export type SocialDrawerList = {
    Feed: undefined;
    SocialProfile: { profileId: number, headerTitle: string },
    Search: { initSearch: string },
}

export type SocialDrawerProps = CompositeScreenProps<
    BottomTabScreenProps<MainTabParamsList, "SocialNetwork">,
    NativeStackScreenProps<RootStackParamsList>
>;

const SocialDrawer: React.FC<SocialDrawerProps> = (props) => {
    const Drawer = createDrawerNavigator<SocialDrawerList>()

    return (
        <Drawer.Navigator initialRouteName="Feed" drawerContent={(props) => <SidebarContent {...props} />} >
            <Drawer.Screen name="Feed" component={FeedScreen} options={({navigation}) => ({
                headerShown: true,
                headerStyle: styles.header,
                headerTintColor: BLACK,
                headerTitleAlign: "center",
                title: "Comunidad Hana",
                headerRight: () => <IconButton icon="magnify" onPress={() => navigation.navigate("Search")}/>
            })} />
            <Drawer.Screen name="SocialProfile" component={SocialProfileScreen} initialParams={{
                profileId: 0, 
                headerTitle: ""
            }}
                options={({route}) => ({
                headerShown: true,
                headerStyle: styles.header,
                headerTintColor: BLACK,
                headerTitleAlign: "center",
                title: route.params.headerTitle,
            })}/>
            <Drawer.Screen name="Search" component={SearchScreen} initialParams={{
                initSearch: ""
            }}
                options={({route}) => ({
                headerShown: true,
                headerStyle: styles.header,
                headerTintColor: BLACK,
                headerTitleAlign: "center",
            })}/>
        </Drawer.Navigator>
    )
}
 
const styles = StyleSheet.create({
    header: {
        backgroundColor: BEIGE_LIGHT,
        borderBottomColor: BEIGE,
        borderBottomWidth: 3,
    }
})


export default SocialDrawer;