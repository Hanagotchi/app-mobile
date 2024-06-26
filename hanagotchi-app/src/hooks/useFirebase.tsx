import { useContext } from "react"
import { FirebaseContext } from "../contexts/FirebaseContext"

const useFirebase = () => {
    const firebaseValue = useContext(FirebaseContext);
    if (!firebaseValue) {
        throw new Error("useFirebase must be used inside FirebaseProvider");
      }
    return firebaseValue;
}

export default useFirebase;