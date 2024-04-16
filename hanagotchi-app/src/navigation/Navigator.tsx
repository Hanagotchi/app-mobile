import useAuth from "../hooks/useAuth";
import {NavigationContainer, NavigatorScreenParams} from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from "../screens/LoginScreen";
import SettingsScreen from "../screens/SettingsScreen";
import {BottomTabNavigationOptions, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CompleteLoginScreen from "../screens/CompleteLoginScreen";
import LogsScreen from "../screens/logs/LogsScreen";
import LogDetailsScreen from "../screens/logs/LogDetailsScreen";
import AddPlantScreen from "../screens/AddPlantScreen";
import {formatDate} from "../common/dateUtils";
import AddSensorScreen from "../screens/AddSensorScreen";
import {StyleSheet, View} from "react-native";
import {BEIGE, BEIGE_DARK, BEIGE_LIGHT, BLACK, GREEN} from "../themes/globalThemes";
import {Entypo, Ionicons} from '@expo/vector-icons';
import ProfileScreen from "../screens/ProfileScreen";
import CreateLogScreen from "../screens/logs/CreateLogScreen";
import {Log} from "../models/Log";
import EditLogScreen from "../screens/logs/EditLogScreen";
import DeletePlantScreen from "../screens/DeletePlantScreen";
import DeleteSensorScreen from "../screens/DeleteSensorScreen";

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
                <Tab.Screen name="Logs" component={LogsScreen} initialParams={{bgColor: "green"}} options={{
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
    Profile: undefined;
    LogDetails: {log_id: number, created_at: Date};
    CompleteLogin: { userId: number };
    AddSensor: undefined;
    DeleteSensor: undefined;
    CreateLog: undefined;
    EditLog: {log: Log};
    AddPlant: undefined;
    DeletePlant: undefined;
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
                            title: "Terminá tu perfil",
                        })} />
                    </>
                ) : (
                    <>
                        <RootStack.Screen name="MainScreens" component={MainScreens} options={{ headerShown: false }} />
                        <RootStack.Screen name="Profile" component={ProfileScreen} options={{headerShown: true, title: "Editar perfil"}}/>
                        <RootStack.Screen name="LogDetails" component={LogDetailsScreen} options={({ route }) => ({
                            title: formatDate(route.params.created_at).toLocaleUpperCase(),
                        })}/>
                        <RootStack.Screen name="AddSensor" component={AddSensorScreen} options={{ headerShown: true, title: "Asociar un sensor"}} />
                        <RootStack.Screen name="DeleteSensor" component={DeleteSensorScreen} options={{ headerShown: true, title: "Eliminar un sensor"}} />
                        <RootStack.Screen name="CreateLog" component={CreateLogScreen} options={({navigation}) => ({
                            title: "Nueva bitácora",
                        })}/>
                        <RootStack.Screen name="EditLog" component={EditLogScreen} options={() => ({
                            title: "Editar bitácora",
                        })}/>
                        <RootStack.Screen name="AddPlant" component={AddPlantScreen} options={{ headerShown: true, title: "Agregar una planta"}} />
                        <RootStack.Screen name="DeletePlant" component={DeletePlantScreen} options={{ headerShown: true, title: "Eliminar una planta"}} />
                    </>
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator;