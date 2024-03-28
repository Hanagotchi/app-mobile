import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, TextInputProps } from 'react-native';
import { theme } from "../themes/globalThemes";
import useAuth from "../hooks/useAuth";
import { RootStackParamsList } from "../navigation/Navigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import LoaderButton from "../components/LoaderButton";
import { TextInput } from 'react-native-paper';

type FirstLoginProps = NativeStackScreenProps<RootStackParamsList, "FirstLogin">;
const FirstLoginScreen: React.FC<FirstLoginProps> = ({ navigation, route }) => {
    const { completeSignIn } = useAuth();
    const { user } = route.params;
    const [name, setName] = useState(user ? JSON.parse(user).name : '');
    const [profilePicture, setProfilePicture] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [gender, setGender] = useState('');
    const [location, setLocation] = useState('');

    const handleComplete = async () => {
        console.log('Name:', name);
        console.log('Profile Picture:', profilePicture);
        console.log('Date of Birth:', dateOfBirth);
        console.log('Gender:', gender);
        console.log('Location:', location);

        await completeSignIn();
        navigation.navigate("MainScreens", { screen: "Home", params: { bgColor: "blue" } });
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <View style={styles.conteiner}>
                <TextInput
                    label="Nombre (*)"
                    value={name}
                    onChangeText={name => setName(name)}
                    mode="outlined"
                />

                <LoaderButton
                    mode="contained"
                    uppercase style={styles.button}
                    onPress={handleComplete}
                    labelStyle={{ fontSize: 17 }}
                >
                    COMPLETAR
                </LoaderButton>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        padding: 20,
        paddingTop: 30

    },
    button: {
        borderRadius: 10,
        width: "50%",
        height: 50,
        alignItems: 'center',
        justifyContent: "center",
        alignSelf: "center",
    },
});

export default FirstLoginScreen;