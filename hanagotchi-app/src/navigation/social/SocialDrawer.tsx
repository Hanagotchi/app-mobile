import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FeedScreen from "../../screens/social/FeedScreen";
import { MainTabParamsList, RootStackParamsList } from "../Navigator";
import SidebarContent from "./SidebarContent";
import { BEIGE, BEIGE_LIGHT, BLACK } from "../../themes/globalThemes";
import {StyleSheet, View} from "react-native" 

const EmptyScreen: React.FC = ({ route }) => {
    const { bgColor } = route.params;
    return <View style={{ flex: 1, backgroundColor: bgColor }} />
}

export type SocialDrawerList = {
    Feed: undefined;
    Profile: { bgColor: string },
}

type SocialDrawerProps = CompositeScreenProps<
    BottomTabScreenProps<MainTabParamsList, "SocialNetwork">,
    NativeStackScreenProps<RootStackParamsList>
>;

const SocialDrawer: React.FC<SocialDrawerProps> = (props) => {
    const Drawer = createDrawerNavigator<SocialDrawerList>()

    return (
        <Drawer.Navigator initialRouteName="Feed" drawerContent={(props) => <SidebarContent {...props} />}>
            <Drawer.Screen name="Feed" component={FeedScreen} options={{
                headerShown: true,
                headerStyle: styles.header,
                headerTintColor: BLACK,
                headerTitleAlign: "center",
                title: "Comunidad Hana",
            }} />
            <Drawer.Screen name="Profile" component={EmptyScreen} initialParams={{bgColor: "violet"}} />
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