import {create, UseBoundStore} from "zustand";
import * as SecureStore from "expo-secure-store";

type SessionData = {
    userId: number;
    accessToken: string;
};

type Session = {
    session: SessionData | null,
    createSession: (newUserId: number, newAccessToken: string) => Promise<void>;
    deleteSession: () => Promise<void>;
    loadFromSecureStore: () => Promise<SessionData | null>;
    getAccessToken: () => Promise<string | undefined>;
}

export const useSession = create<Session>()((set, get) => ({
    session: null,
    createSession: async (newUserId: number, newAccessToken: string) => {
        const newSession = {userId: newUserId, accessToken: newAccessToken};
        SecureStore.setItemAsync("session", JSON.stringify(newSession));
        console.log("[CREATE_SESSION] ", newSession);
        set((_) => ({session: newSession}));
    },
    deleteSession: async () => {
        SecureStore.deleteItemAsync("session");
        console.log("[DELETE_SESSION] ");
        set((_) => ({session: null}));
    },
    loadFromSecureStore: async () => {
        const rawLastSession = await SecureStore.getItemAsync("session");
        const lastSession: SessionData | null = rawLastSession ? JSON.parse(rawLastSession) : null;
        console.log("[CHECKED_STORAGE] ", lastSession);
        set((_) => ({session: lastSession}));
        return lastSession;
    },
    getAccessToken: async () => get().session?.accessToken,
}));