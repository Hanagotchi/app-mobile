import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { BROWN_DARK, theme } from "../themes/globalThemes";
import useAuth from "../hooks/useAuth";
import { RootStackParamsList } from "../navigation/Navigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import EditUser from '../components/EditUser';
import useLocation from '../hooks/useLocation';
import { useHanagotchiApi } from "../hooks/useHanagotchiApi";
import { User } from '../models/User';
import { UserLocation } from '../contexts/LocationContext';
import { useApiFetch } from '../hooks/useApiFetch';
import NoContent from '../components/NoContent';

type CompleteLoginProps = NativeStackScreenProps<RootStackParamsList, "CompleteLogin">;

export type UserData = User & { dateOfBirth: Date } & { location: UserLocation }

const CompleteLoginScreen: React.FC<CompleteLoginProps> = ({ navigation, route }) => {
    const api = useHanagotchiApi();
    const { userId } = route.params;
    const { signOut, completeSignIn } = useAuth();
    const { location, requestLocation, revokeLocation } = useLocation();

    const [user, setUser] = useState<UserData | undefined>();
    const { isFetching, fetchedData, error } = useApiFetch(
        () => api.getUser(userId),
    );

    if (!isFetching && error) {
        throw error;
    }

    useEffect(() => {
        const fetchData = async () => {
            setUser({
                ...fetchedData?.message,
                dateOfBirth: new Date(2000, 0, 1),
            } as UserData);
        }
        fetchData();
    }, [fetchedData]);


    useEffect(
        () =>
            // https://reactnavigation.org/docs/preventing-going-back/
            navigation.addListener('beforeRemove', async (e) => {
                await signOut();
                revokeLocation();
                setUser(undefined);
                navigation.navigate("Login");
            }),
        [navigation]
    );

    useEffect(() => {
        const requestLocationOnce = async () => {
            console.log("Requesting location - Login Screen!");
            await requestLocation();
        };
        requestLocationOnce();
    }, []);

    const handleComplete = async () => {
        console.log('Name:', user?.name);
        console.log('Profile Picture:', user?.photo);
        console.log('Date of Birth:', user?.dateOfBirth);
        console.log('Gender:', user?.gender);
        console.log('Location:', location);

        // await uploadImage(user?.photo ?? 'https://cdn-icons-png.flaticon.com/128/3033/3033143.png', user?.email ?? '', 'avatar');
        await completeSignIn();
        alert('Falta pegar endpoint backend y si no completo algun dato mostrar un msgta error jeje!');
        navigation.navigate("MainScreens", { screen: "Home", params: { bgColor: "blue" } });
    };
    return (

        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    {isFetching ? (
                        <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={styles.activityIndicator} />
                    ) : (
                            fetchedData === undefined || user === undefined ? (
                                <NoContent />
                            ) : (
                                    <EditUser
                                        user={user}
                                        name_button='COMPLETAR'
                                        onPressCompleteEdit={handleComplete}
                                        setUser={setUser}
                                    />
                                )
                        )
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flexGrow: 1,
        backgroundColor: theme.colors.background,
    },
    scrollViewContent: {
        paddingBottom: 30,
    },
    container: {
        flex: 0,
        justifyContent: 'flex-start',
        paddingTop: 30,
        alignItems: "center",
        gap: 20,
    },
    activityIndicator: {
        justifyContent: "center",
        flexGrow: 1,
    },
});

export default CompleteLoginScreen;
