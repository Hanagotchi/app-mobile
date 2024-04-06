import { PropsWithChildren, createContext, useEffect } from "react";
import env from "../environment/loader";
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import 'firebase/compat/auth';

export const profilePictureUrl = (user_email: string, subfolder: string) => {
    const date = new Date().getTime();
    return `users/${user_email}/${subfolder}/${date}`;
};

export const logPhotoUrl = (plantId: number) => {
    const date = new Date().getTime();
    return `plants/${plantId}/${date}`;
}

export type FirebaseContextProps = {
    uploadImage: (local_uri: string, firebaseFilepath: string) => Promise<string>;
    removeImage: (remote_uri: string) => Promise<void>;
}

export const FirebaseContext = createContext<FirebaseContextProps>({
    uploadImage: () => Promise.resolve(""),
    removeImage: () => Promise.resolve()
});

export const FirebaseProvider: React.FC<PropsWithChildren> = ({ children }) => {
    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp(env.firebaseConfig)
            console.log("Firebase initialized!")
        }
    }, [])

    const uploadImage = async (local_uri: string, firebaseFilepath: string) => {
        const response = await fetch(local_uri);
        const blob = await response.blob();
        let date = new Date().getTime()

        // TODO ... ERROR HANDLING!!
        const res = await firebase.storage().ref().child(firebaseFilepath).put(blob)
        const remote_uri = await firebase.storage().ref().child(firebaseFilepath).getDownloadURL()
        return remote_uri
    }

    const removeImage = async (remote_uri: string) => {
        const response = await firebase.storage().refFromURL(remote_uri).delete();

        // TODO !! ERRORS!! READ DOCS
    }

    const firebaseValues: FirebaseContextProps = {
        uploadImage,
        removeImage
    };

    return <FirebaseContext.Provider value={firebaseValues}>
        {children}
    </FirebaseContext.Provider>
}

