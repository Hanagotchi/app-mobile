import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useHanagotchiApi } from "../hooks/useHanagotchiApi";
import { LoginResponse } from "../models/hanagotchiApi";
import env from "../environment/loader";
import { User, UserSchema } from "../models/User";
import useLocalStorage from "../hooks/useLocalStorage";

export type AuthContextProps = {
    loggedIn: boolean;
    signIn: () => Promise<User>
    signOut: () => Promise<void>;
    completeSignIn: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
    loggedIn: false,
    signIn: () => Promise.resolve({} as User),
    signOut: () => Promise.resolve(),
    completeSignIn: () => Promise.resolve()
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const hanagotchiApi = useHanagotchiApi();
    const { set } = useLocalStorage();
    const { remove } = useLocalStorage();

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

    const completeSignIn = async () => {
        setLoggedIn(true);
    };

    const signIn = async () => {
        try {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            // Get the users ID token
            const { idToken, serverAuthCode } = await GoogleSignin.signIn();
            
            const { message: user} : LoginResponse = await hanagotchiApi.logIn(serverAuthCode ?? "null");
            await set("userId", user.id.toString());

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            const userCredential = auth().signInWithCredential(googleCredential);
            return UserSchema.parse(user);

        } catch (err) {
            await remove("userId");

            if (await GoogleSignin.isSignedIn()) {
                await GoogleSignin.signOut();
            }
            throw err;
        }
    };

    const signOut = async () => {
        await GoogleSignin.signOut();
        await auth().signOut()
        await remove("userId");
        setLoggedIn(false);
    };

    const authValues: AuthContextProps = {
        loggedIn: loggedIn,
        signIn: signIn,
        signOut: signOut,
        completeSignIn: completeSignIn
    };

    return <AuthContext.Provider value={authValues}>
        {children}
    </AuthContext.Provider>
}

