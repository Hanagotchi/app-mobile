import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth must be used inside AuthProvider");
      }
    return authContextValue;
}

export default useAuth;