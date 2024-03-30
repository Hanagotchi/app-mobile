import { SafeAreaView, StyleSheet } from "react-native"
import useAuth from "../hooks/useAuth";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamsList, RootStackParamsList } from "../navigation/Navigator";
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import LoaderButton from "../components/LoaderButton";
import { useEffect, useState } from "react";
import { BACKGROUND_COLOR, BEIGE, BROWN_LIGHT } from "../themes/globalThemes";
import TextInput from "../components/TextInput";
import useLocalStorage from "../hooks/useLocalStorage";


type SettingsScreenProps = CompositeScreenProps<
    BottomTabScreenProps<MainTabParamsList, "Settings">,
    NativeStackScreenProps<RootStackParamsList>
>;

const SettingsScreen: React.FC<SettingsScreenProps> = ({navigation}) => {
    const {signOut} = useAuth();
    const { get } = useLocalStorage();
    
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [lenght, setLenght] = useState(0);
    const MAX_LENGHT = 500;

    useEffect(() => {
        const setInitialState = navigation.addListener('focus', () => {
            setName("");
            setText("");
            setLenght(0);
        });

        return setInitialState;
      }, [navigation]);

    useEffect(() => {
        setLenght(text.length)
    }, [text])

    const handleSignOut = async () => {
        await signOut();
        navigation.navigate("Login");
    }

    return <SafeAreaView style={style.container}>
        <TextInput label={`NOMBRE`} value={name} onChangeText={(name) => setName(name)}/>
        <TextInput 
            label={`DESCRIPCIÓN    ${lenght}/${MAX_LENGHT}`} 
            value={text} 
            onChangeText={(text) => setText(text)}
            numberOfLines={4}
            maxLenght={500}
        />
        <LoaderButton 
            mode="contained" 
            uppercase style={style.button} 
            onPress={handleSignOut}
            labelStyle={{fontSize: 17}}
        >
            Cerrar sesión
        </LoaderButton>
    </SafeAreaView>
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: "center",
        paddingBottom: 20,
        gap: 10,
        backgroundColor: BACKGROUND_COLOR,
    },
    button: {
        borderRadius: 10,
        width: "50%",
        height: 50,
        justifyContent: "center",
    },
    card: {
        backgroundColor: BEIGE,
        width: "80%",
        gap: 0,
        columnGap: 0,
    },
    cardTitle: {
        color: BROWN_LIGHT,
        fontSize: 12,
    }
})

export default SettingsScreen;