import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/LoginScreen";
import LandingScreen from "../screens/LandingScreen";

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
                <Stack.Screen name="Home" component={LandingScreen} />
            )}
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator;