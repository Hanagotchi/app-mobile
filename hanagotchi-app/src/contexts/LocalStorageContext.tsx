import { PropsWithChildren, createContext } from "react";
import * as SecureStore from "expo-secure-store";

export type LocalStorageContextProps = {
    set: (key: string, value: string) => Promise<void>;
    get: (key: string) => Promise<string | null>;
    remove: (key: string) => Promise<void>;
}

export const LocalStorageContext = createContext<LocalStorageContextProps>({
    set: async () => { },
    get: async () => "",
    remove: async () => { }
});

export const LocalStorageProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const set = async (key: string, value: string) => {
        await SecureStore.setItemAsync(key, value);
    }

const get = async (key: string) => {
    return await SecureStore.getItemAsync(key);
}


    const remove = async (key: string) => {
        await SecureStore.deleteItemAsync(key);
    }

    const localStorageValues: LocalStorageContextProps = {
        set,
        get,
        remove
    };

    return <LocalStorageContext.Provider value={localStorageValues}>
        {children}
    </LocalStorageContext.Provider>
}

