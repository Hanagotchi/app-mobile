import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import {BROWN_DARK, theme} from "../themes/globalThemes";
import {RootStackParamsList} from "../navigation/Navigator";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import React, {useEffect, useState} from "react";
import {User} from "../models/User";
import {useApiFetch} from "../hooks/useApiFetch";
import {useHanagotchiApi} from "../hooks/useHanagotchiApi";
import EditUser from "../components/EditUser";
import useLocation from "../hooks/useLocation";
import useFirebase from "../hooks/useFirebase";
import {DEFAULT_PHOTO} from "../components/ProfilePicture";
import {handleError} from "../common/errorHandling";
import { useSession } from "../hooks/useSession";
import { profilePictureUrl } from "../contexts/FirebaseContext";

type ProfileScreenProps = NativeStackScreenProps<RootStackParamsList, "Profile">

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
    const api = useHanagotchiApi();
    const userId = useSession((state) => state.session?.userId)!;
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
            console.log("Requesting location - Profile Screen!");
            await requestLocation();
        };
        requestLocationOnce();
    }, []);

    const handleComplete = async () => {
        if (!user) {
            return;
        }
        try {
            const filepath = profilePictureUrl(user.email, 'avatar');
            const userUpdated: User = {
                ...user,
                photo: user?.photo?.startsWith('file://') ? await uploadImage(user.photo ?? DEFAULT_PHOTO, filepath) : user.photo
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
        paddingBottom: 20
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