import { PropsWithChildren, createContext, useEffect, useMemo, useState } from "react";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useHanagotchiApi } from "../hooks/useHanagotchiApi";
import { LoginResponse } from "../models/hanagotchiApi";
import env from "../environment/loader";
import * as SecureStore from "expo-secure-store";
import { ToastAndroid } from "react-native";

export type AuthContextProps = {
    loggedIn: boolean;
    signIn: () => void;
    signOut: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    loggedIn: false,
    signIn: () => {},
    signOut: () => {}
});

export const AuthProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const hanagotchiApi = useHanagotchiApi();

    useEffect(() => {
        /* Configure GoogleSignIn with webClientId */
        GoogleSignin.configure({
            webClientId: env.googleWebClientId,
            offlineAccess: true, /* allows GoogleSignin.signIn() to return the auth_code for the api */
        });  

        /* Get if user is logged in */
        const validateSignIn = async () => setLoggedIn(await GoogleSignin.isSignedIn());
        validateSignIn();
    }, [])

    const signIn = async () => {
        try {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            // Get the users ID token
            const { idToken, serverAuthCode } = await GoogleSignin.signIn();
            const {message}: LoginResponse = await hanagotchiApi.logIn(serverAuthCode ?? "null");
            await SecureStore.setItemAsync("user", JSON.stringify(message));

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            const userCredential = auth().signInWithCredential(googleCredential);
            setLoggedIn(true);
            return userCredential

        } catch (err) {
            SecureStore.deleteItemAsync("user");
            setLoggedIn(false);
            if (await GoogleSignin.isSignedIn()) {
                await GoogleSignin.signOut();
            }
            throw err;
        }
    };

    const signOut = async () => {
        // await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        await auth().signOut()
        SecureStore.deleteItemAsync("user");
        setLoggedIn(false);
    };

    const authValues: AuthContextProps = {
        loggedIn: loggedIn,
        signIn: signIn,
        signOut: signOut,
    };

    return <AuthContext.Provider value={authValues}>
        {children}
    </AuthContext.Provider>
}

