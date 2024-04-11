import {ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {Icon} from 'react-native-paper';
import {BROWN_DARK, theme} from "../themes/globalThemes";
import {RootStackParamsList} from "../navigation/Navigator";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import React, {useEffect, useState} from "react";
import back from "../assets/backicon.png";
import {User} from "../models/User";
import {useApiFetch} from "../hooks/useApiFetch";
import {useHanagotchiApi} from "../hooks/useHanagotchiApi";
import * as SecureStore from "expo-secure-store";
import EditUser from "../components/EditUser";
import useLocation from "../hooks/useLocation";
import useFirebase from "../hooks/useFirebase";
import {DEFAULT_PHOTO} from "../components/ProfilePicture";
import {handleError} from "../common/errorHandling";

type ProfileScreenProps = NativeStackScreenProps<RootStackParamsList, "Profile">

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
    const api = useHanagotchiApi();
    const userId = Number(SecureStore.getItem("userId"))
    const { requestLocation } = useLocation();
    const { uploadImage } = useFirebase();
    const [user, setUser] = useState<User>();
    const { isFetching, fetchedData, error } = useApiFetch(() => api.getUser(userId), user);

    useEffect(() => {
        const fetchData = async () => { setUser(fetchedData) }
        fetchData();
    }, [fetchedData]);


    useEffect(() => {
        const requestLocationOnce = async () => {
            console.log("Requesting location - Login Screen!");
            await requestLocation();
        };
        requestLocationOnce();
    }, []);

    const handleComplete = async () => {
        try {
            const userUpdated: User = {
                ...user,
                photo: user?.photo?.startsWith('file://') ? await uploadImage(user?.photo ?? DEFAULT_PHOTO, user?.email ?? '', 'avatar') : user?.photo
            } as User;
            await api.patchUser(userUpdated);
            navigation.navigate("MainScreens", { screen: "Settings" });
        } catch (err: any) {
            handleError(err as Error);
        }
    };

    if (!isFetching && error) { throw error }

    return (
        <SafeAreaView style={style.safeArea}>
            <ScrollView contentContainerStyle={style.scrollViewContent} keyboardShouldPersistTaps="handled">
                <View style={style.container}>
                    <View style={style.header}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Icon size={24} source={back}/>
                        </Pressable>
                        <Text style={style.title}>Editar perfil</Text>
                    </View>
                </View>

                {isFetching ? (
                    <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={style.activityIndicator} />
                ) : (
                    <View style={style.editContainer}>
                        <EditUser
                            user={user!}
                            name_button='GUARDAR'
                            onPressCompleteEdit={handleComplete}
                            setUser={setUser}
                        />
                    </View>
                    )
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        gap: 40,
    },
    editContainer: {
        flex: 0,
        justifyContent: 'flex-start',
        paddingTop: 30,
        alignItems: "center",
        gap: 20,
    },
    safeArea: {
        flexGrow: 1,
        backgroundColor: theme.colors.background,
    },
    activityIndicator: {
        justifyContent: "center",
        flexGrow: 1,
    },
    scrollViewContent: {
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        paddingHorizontal: 20,
        width: '100%',
        gap: 10
    },
    title: {
      fontSize: 25,
      fontFamily: "IBMPlexMono_Italic",
      textAlign: 'center',
      fontWeight: "bold"
    }
  })
  
export default ProfileScreen;