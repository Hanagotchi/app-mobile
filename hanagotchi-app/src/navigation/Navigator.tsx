import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/LoginScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from "react-native";

const EmptyScreen: React.FC = ({route}) => {
    const {bgColor} = route.params;
    return <View style={{flex: 1, backgroundColor: bgColor}} />
}

export type MainTabParamsList = {
    Home: {bgColor: string},
    Logs: {bgColor: string},
    SocialNetwork: {bgColor: string},
    Settings: undefined,
}

const MainScreens: React.FC = () => {
    const Tab = createBottomTabNavigator<MainTabParamsList>();

    return (
        <Tab.Navigator>
            <Tab.Group screenOptions={{headerShown: false}}>
                <Tab.Screen name="Home" component={EmptyScreen} initialParams={{bgColor: "blue"}}/>
                <Tab.Screen name="Logs" component={EmptyScreen} initialParams={{bgColor: "green"}}/>
                <Tab.Screen name="SocialNetwork" component={EmptyScreen} initialParams={{bgColor: "red"}}/>
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Group>
        </Tab.Navigator>
    );
}

export type RootStackParamsList = {
    Login: undefined;
    MainScreens: NavigatorScreenParams<MainTabParamsList>;
}

const Navigator: React.FC = () => {
    const RootStack = createNativeStackNavigator<RootStackParamsList>();
    const {loggedIn} = useAuth();

    return (
    <NavigationContainer>
        <RootStack.Navigator>
            {!loggedIn ? (
                <RootStack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
            ) : (
                <RootStack.Screen name="MainScreens" component={MainScreens} options={{headerShown: false}}/>
            )}
        </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator;