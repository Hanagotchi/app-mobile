import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { theme } from "../themes/globalThemes";
import useAuth from "../hooks/useAuth";
import { RootStackParamsList } from "../navigation/Navigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ImagePicker from 'expo-image-picker';
import EditUser from '../components/EditUser';
import useLocation from '../hooks/useLocation';
import useFirebase from '../hooks/useFirebase';
import useLocalStorage from '../hooks/useLocalStorage';
import { useHanagotchiApi } from "../hooks/useHanagotchiApi";
import { LoginResponse } from '../models/hanagotchiApi';
import { User } from '../models/User';
import { FIUBA_REGION, UserLocation } from '../contexts/LocationContext';
import { Details, Region } from 'react-native-maps';

type CompleteLoginProps = NativeStackScreenProps<RootStackParamsList, "CompleteLogin">;

export type UserData = User & { dateOfBirth?: string } & { location: UserLocation }

const CompleteLoginScreen: React.FC<CompleteLoginProps> = ({ navigation, route }) => {
    const hanagotchiApi = useHanagotchiApi();
    const { signOut } = useAuth();
    const { uploadImage } = useFirebase();
    const { get } = useLocalStorage();
    const { location, requestLocation, revokeLocation, changeLocation } = useLocation();

    const [user, setUser] = useState<UserData>({ id: -1, email: '' } as UserData);

    const genders = [
        { key: 1, value: "HOMBRE" },
        { key: 2, value: "MUJER" },
        { key: 3, value: "OTRO" },
    ]
    const fetchUser = async () => {
        const user_id = await get("user_id");
        if (!user_id) {
            console.log("No user_id found");
            return;
        }
        const { message: userFetched }: LoginResponse = await hanagotchiApi.getUser(Number(user_id));
        // setDateOfBirth(new Date(user.dateOfBirth ?? ''));s
        setUser(userFetched as UserData);
    }


    const handleBirthDay = async (date: Date) => {
        setUser({ ...user, dateOfBirth: date.toDateString() } as UserData);
    }
    const handleName = (name: string) => {
        setUser({ ...user, name: name } as UserData);
    }
    const handleGender = (val: string) => {
        setUser({ ...user, gender: val } as UserData);
    }

    const handleRegionChange = (region: Region, details: Details) => {
        changeLocation(region.latitude, region.longitude, region.latitudeDelta, region.longitudeDelta);
    }

    const handleUploadPhoto = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('¡Se requiere permiso para acceder a la galería de imágenes!');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
        if (!result.canceled) {
            setUser({ ...user, photo: result.assets[0].uri } as UserData);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await requestLocation();
            await fetchUser();
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (location !== FIUBA_REGION && user.location !== location) {
            setUser({ ...user, location: location });
        }
    }, [location]);

    useEffect(
        () =>
            // https://reactnavigation.org/docs/preventing-going-back/
            navigation.addListener('beforeRemove', async (e) => {
                console.log("signOut start");
                await signOut();
                console.log("signOut success");
                revokeLocation();
                navigation.navigate("Login");
            }),
        [navigation]
    );

    const handleSignOut = async () => {
        console.log('Name:', user?.name);
        console.log('Profile Picture:', user?.photo);
        console.log('Date of Birth:', user?.dateOfBirth);
        console.log('Gender:', user?.gender);
        console.log('Location:', location);

        // await uploadImage(user?.photo ?? 'https://cdn-icons-png.flaticon.com/128/3033/3033143.png', user?.email ?? '', 'avatar');
        // await completeSignIn();
        // navigation.navigate("MainScreens", { screen: "Home", params: { bgColor: "blue" } });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <View style={styles.conteiner}>
                <EditUser
                    user={user}
                    genders={genders}
                    onChangeName={handleName}
                    onChangeDateOfBirth={handleBirthDay}
                    onSelectGender={handleGender}
                    onPressCompleteEdit={handleSignOut}
                    onPressUploadPhoto={handleUploadPhoto}
                    onRegionChange={handleRegionChange}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 30,
        alignItems: "center",
        gap: 20,
    },
});

export default CompleteLoginScreen;
