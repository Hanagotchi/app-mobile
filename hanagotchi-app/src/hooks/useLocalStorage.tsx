import { useContext } from "react"
import { LocalStorageContext } from "../contexts/LocalStorageContext"

const useLocalStorage = () => {
    const localStorageValue = useContext(LocalStorageContext);
    if (!localStorageValue) {
        throw new Error("useAuth must be used inside LocalStorageProvider");
      }
    return localStorageValue;
}

export default useLocalStorage;