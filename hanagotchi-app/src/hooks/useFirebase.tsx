import { useContext } from "react"
import { FirebaseContext } from "../contexts/FirebaseContext"

const useFirbase = () => {
    const firebaseValue = useContext(FirebaseContext);
    if (!firebaseValue) {
        throw new Error("useAuth must be used inside FirebaseProvider");
      }
    return firebaseValue;
}

export default useFirbase;