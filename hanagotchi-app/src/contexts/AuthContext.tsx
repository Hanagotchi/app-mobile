import { PropsWithChildren, createContext, useEffect, useMemo, useState } from "react";
import * as SecureStore from 'expo-secure-store';

const DUMMY_USER_TOKEN = "dummyUserToken";

export type AuthContextProps = {
    userToken: string | null;
    signIn: () => void;
    signOut: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    userToken: null,
    signIn: () => {},
    signOut: () => {}
});

export const AuthProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [userToken, setUserToken] = useState<string | null>(null)

    useEffect(() => {
        const fetchUserToken = async () => {
            let receiveUserToken = null;
            try {
                receiveUserToken = await SecureStore.getItemAsync('userToken');
            } catch (e) {
                console.log("OPA");
            }
            setUserToken(receiveUserToken);
        };

        fetchUserToken();
    }, [])


    const signIn = async () => {
        await SecureStore.setItemAsync("userToken", DUMMY_USER_TOKEN);
        setUserToken(DUMMY_USER_TOKEN);
    };

    const signOut = async () => {
        await SecureStore.deleteItemAsync("userToken");
        setUserToken(null);
    };

    const auth: AuthContextProps = {
        userToken: userToken,
        signIn: signIn,
        signOut: signOut,
    };

    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
}

