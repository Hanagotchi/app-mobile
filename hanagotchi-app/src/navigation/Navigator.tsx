import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/LoginScreen";
import LandingScreen from "../screens/LandingScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from "react-native";

const EmptyScreen: React.FC = ({route}) => {
    const {bgColor} = route.params;
    return <View style={{flex: 1, backgroundColor: bgColor}} />
}

const MainScreens: React.FC = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Group screenOptions={{headerShown: false}}>
                <Tab.Screen name="Home" component={EmptyScreen} initialParams={{bgColor: "blue"}}/>
                <Tab.Screen name="Logs" component={EmptyScreen} initialParams={{bgColor: "green"}}/>
                <Tab.Screen name="SocialNetwork" component={EmptyScreen} initialParams={{bgColor: "red"}}/>
                <Tab.Screen name="Settings" component={LandingScreen} />
            </Tab.Group>
        </Tab.Navigator>
    );
}

const Navigator: React.FC = () => {
    const Stack = createNativeStackNavigator();
    const {loggedIn} = useAuth();

    useEffect(() => {
        console.log(loggedIn ? "Signed in" : "Signed out");
    }, [loggedIn])

    return (
    <NavigationContainer>
        <Stack.Navigator>
            {!loggedIn ? (
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
            ) : (
                <Stack.Screen name="MainScreens" component={MainScreens} options={{headerShown: false}}/>
            )}
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator;