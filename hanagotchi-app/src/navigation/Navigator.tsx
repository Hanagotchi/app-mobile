import useAuth from "../hooks/useAuth";
import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/LoginScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CompleteLoginScreen from "../screens/CompleteLoginScreen";
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import { BEIGE, BEIGE_DARK, BEIGE_LIGHT, BLACK, BROWN_LIGHT, GREEN } from "../themes/globalThemes";
import { Entypo, Ionicons } from '@expo/vector-icons';

const EmptyScreen: React.FC = ({ route }) => {
    const { bgColor } = route.params;
    return <View style={{ flex: 1, backgroundColor: bgColor }} />
}

const HomeIcon = (props: {
    focused: boolean;
    color: string;
    size: number;
}) => <Entypo name="home" size={props.size} color={props.color} />;

const LogIcon = (props: {
    focused: boolean;
    color: string;
    size: number;
}) => <Entypo name="book" size={props.size} color={props.color} />;

const SocialIcon = (props: {
    focused: boolean;
    color: string;
    size: number;
}) => <Entypo name="leaf" size={props.size} color={props.color} />;

const SettingsIcon = (props: {
    focused: boolean;
    color: string;
    size: number;
}) => <Ionicons name="settings" size={props.size} color={props.color} />;

const styles = StyleSheet.create({
    bottomTab: {
        backgroundColor: BEIGE_LIGHT,
        borderTopColor: BEIGE,
        borderTopWidth: 3,
    },
    header: {
        backgroundColor: BEIGE_LIGHT,
        borderBottomColor: BEIGE,
        borderBottomWidth: 3,
    }
})

const screenOptions: BottomTabNavigationOptions = {
    tabBarStyle: styles.bottomTab,
    headerShown: false,
    tabBarActiveTintColor: GREEN,
    tabBarInactiveTintColor: BEIGE_DARK,
    tabBarLabelStyle: { fontWeight: "bold" }
};

export type MainTabParamsList = {
    Home: { bgColor: string },
    Logs: { bgColor: string },
    SocialNetwork: { bgColor: string },
    Settings: undefined,
}

const MainScreens: React.FC = () => {
    const Tab = createBottomTabNavigator<MainTabParamsList>();

    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Group>
                <Tab.Screen name="Home" component={EmptyScreen} initialParams={{ bgColor: "blue" }} options={{
                    tabBarLabel: "Home",
                    tabBarIcon: HomeIcon,
                }} />
                <Tab.Screen name="Logs" component={EmptyScreen} initialParams={{ bgColor: "green" }} options={{
                    tabBarLabel: "Bitácoras",
                    tabBarIcon: LogIcon,
                }} />
                <Tab.Screen name="SocialNetwork" component={EmptyScreen} initialParams={{ bgColor: "red" }} options={{
                    tabBarLabel: "Red social",
                    tabBarIcon: SocialIcon,
                }} />
                <Tab.Screen name="Settings" component={SettingsScreen} options={{
                    tabBarLabel: "Configuración",
                    tabBarIcon: SettingsIcon,
                }} />
            </Tab.Group>
        </Tab.Navigator>
    );
}

export type RootStackParamsList = {
    Login: undefined;
    MainScreens: NavigatorScreenParams<MainTabParamsList>;
    CompleteLogin: { userId: number };
}

const Navigator: React.FC = () => {
    const RootStack = createNativeStackNavigator<RootStackParamsList>();
    const { loggedIn } = useAuth();

    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{
                headerStyle: styles.header,
                headerTintColor: BLACK,
                headerTitleAlign: "center",
            }}>
                {!loggedIn ? (
                    <>
                        <RootStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                        <RootStack.Screen name="CompleteLogin" component={CompleteLoginScreen} options={() => ({
                            title: "Termina tu perfil",
                        })} />
                    </>
                ) : (
                    <RootStack.Screen name="MainScreens" component={MainScreens} options={{ headerShown: false }} />
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator;