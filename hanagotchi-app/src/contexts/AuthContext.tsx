import { PropsWithChildren, createContext, useEffect, useMemo, useState } from "react";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import * as SecureStore from 'expo-secure-store';

const DUMMY_USER_TOKEN = "dummyUserToken";

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

    useEffect(() => {
        /* Configure GoogleSignIn with webClientId */
        GoogleSignin.configure({
            webClientId: '1029732192625-gisom6p85duv00p5pic8d5e9p9gp89qp.apps.googleusercontent.com',
            offlineAccess: true, /* allows GoogleSignin.signIn() to return the auth_code for the api */
        });  

        /* Get if user is logged in */
        const validateSignIn = async () => setLoggedIn(await GoogleSignin.isSignedIn());
        validateSignIn();
    }, [])

    const signIn = async () => {

        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

        // Get the users ID token
        const { idToken, serverAuthCode } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        const userCredential = auth().signInWithCredential(googleCredential);
        setLoggedIn(true);
        return userCredential
    };

    const signOut = async () => {
        // await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        await auth().signOut()
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

