import {createContext, PropsWithChildren, useEffect} from "react";
import env from "../environment/loader";
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import 'firebase/compat/auth';

export type FirebaseContextProps = {
    uploadImage: (local_uri: string, user_email: string, subfolder: string) => Promise<string>;
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

    const uploadImage = async (local_uri: string, user_email: string, subfolder: string) => {
        const response = await fetch(local_uri);
        const blob = await response.blob();
        let date = new Date().getTime()

        // TODO ... ERROR HANDLING!!
        const res = await firebase.storage().ref().child(`users/${user_email}/${subfolder}/${date}`).put(blob)
        const remote_uri = await firebase.storage().ref().child(`users/${user_email}/${subfolder}/${date}`).getDownloadURL()
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

