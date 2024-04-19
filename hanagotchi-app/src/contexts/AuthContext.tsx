import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useHanagotchiApi } from "../hooks/useHanagotchiApi";
import { LoginResponse } from "../models/hanagotchiApi";
import env from "../environment/loader";
import { User, UserSchema } from "../models/User";
import { useSession } from "../hooks/useSession";

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
    const [createSession, deleteSession, loadFromSecureStore] = useSession((state) => [state.createSession, state.deleteSession, state.loadFromSecureStore])

    useEffect(() => {
        /* Configure GoogleSignIn with webClientId */
        GoogleSignin.configure({
            webClientId: env.googleWebClientId,
            offlineAccess: true, /* allows GoogleSignin.signIn() to return the auth_code for the api */
        });

        /* Retrieve last session from Secure Store */
        const lastSession = loadFromSecureStore();

        /* Get if user is logged in */
        const validateSignIn = async () => setLoggedIn(await GoogleSignin.isSignedIn() && lastSession !== null);

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
            
            const { 
                data: {
                    message: user
                }, 
                headers: {
                    "x-access-token": accessToken
                }
            } : LoginResponse = await hanagotchiApi.logIn(serverAuthCode ?? "null");
            createSession(user.id, accessToken);

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            const userCredential = auth().signInWithCredential(googleCredential);
            return UserSchema.parse(user);

        } catch (err) {
            await deleteSession();

            if (await GoogleSignin.isSignedIn()) {
                await GoogleSignin.signOut();
            }
            throw err;
        }
    };

    const signOut = async () => {
        setLoggedIn(false);
        await GoogleSignin.signOut();
        await auth().signOut()
        await deleteSession();
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

