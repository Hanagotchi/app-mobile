import {ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {Icon} from 'react-native-paper';
import {BEIGE, BROWN_DARK, BROWN_LIGHT, theme} from "../themes/globalThemes";
import {RootStackParamsList} from "../navigation/Navigator";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import React, {useState} from "react";
import back from "../assets/backicon.png";
import EditUser from "../components/EditUser";
import {User} from "../models/User";
import {useApiFetch} from "../hooks/useApiFetch";
import {useHanagotchiApi} from "../hooks/useHanagotchiApi";
import * as SecureStore from "expo-secure-store";
import NoContent from "../components/NoContent";

type ProfileScreenProps = NativeStackScreenProps<RootStackParamsList, "Profile">

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
    const api = useHanagotchiApi();
    const userId = Number(SecureStore.getItem("userId"))
    const [user, setUser] = useState<User>();
    const { isFetching, fetchedData, error } = useApiFetch(
        () => api.getUser(userId),
        user
    );
    console.log(userId)
    console.log(user)
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
                    fetchedData === undefined || user === undefined ? (
                        <NoContent />
                    ) : (
                        <EditUser
                            user={user}
                            name_button='GUARDAR'
                            onPressCompleteEdit={()=> console.log("  ")}
                            setUser={setUser}
                        />
                    )
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