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
import { useApiFetch } from '../hooks/useApiFetch';
import NoContent from '../components/NoContent';
import useFirebase from '../hooks/useFirebase';
import { handleError } from '../common/errorHandling';
import { DEFAULT_PHOTO } from '../components/ProfilePicture';

type CompleteLoginProps = NativeStackScreenProps<RootStackParamsList, "CompleteLogin">;

const CompleteLoginScreen: React.FC<CompleteLoginProps> = ({ navigation, route }) => {
    const api = useHanagotchiApi();
    const { userId } = route.params;
    const { signOut, completeSignIn } = useAuth();
    const { requestLocation, revokeLocation } = useLocation();
    const { uploadImage } = useFirebase();
    const [user, setUser] = useState<User>();
    const { isFetching, fetchedData, error } = useApiFetch(
        () => api.getUser(userId),
        user
    );

    if (!isFetching && error) {
        throw error;
    }

    useEffect(() => {
        const fetchData = async () => {
            setUser(fetchedData);
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
        if (!user) {
            return;
        }
        try {
            const userUpdated: User = {
                ...user,
                photo: user?.photo?.startsWith('file://') ? await uploadImage(user?.photo ?? DEFAULT_PHOTO, user?.email ?? '', 'avatar') : user.photo
            } as User;
            setUser(userUpdated);
            await api.patchUser(userUpdated);
            await completeSignIn();
            navigation.navigate("MainScreens", { screen: "Home", params: { bgColor: "blue" } });
        } catch (err: any) {
            handleError(err as Error);
        }
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
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
