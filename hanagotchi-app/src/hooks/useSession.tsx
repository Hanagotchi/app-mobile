import {create} from "zustand";
import * as SecureStore from "expo-secure-store";

type SessionData = {
    userId: number;
    accessToken: string;
};

type Session = {
    session: SessionData | null,
    logIn: (newUserId: number, newAccessToken: string) => Promise<void>;
    logOut: () => Promise<void>;
    loadFromSecureStore: () => void;
}

export const useSession = create<Session>()((set) => ({
    session: null,
    logIn: async (newUserId: number, newAccessToken: string) => {
        const newSession = {userId: newUserId, accessToken: newAccessToken};
        SecureStore.setItemAsync("session", JSON.stringify(newSession));
        set((_) => ({session: newSession}));
    },
    logOut: async () => {
        SecureStore.deleteItemAsync("session");
        set((_) => ({session: null}));
    },
    loadFromSecureStore: () => {
        const rawLastSession = SecureStore.getItem("session");
        const lastSession: SessionData | null = rawLastSession ? JSON.parse(rawLastSession) : null;
        set((_) => ({session: lastSession}));
    },
}))