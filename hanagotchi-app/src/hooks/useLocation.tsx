import { useContext } from "react";
import { LocationContext } from "../contexts/LocationContext";

const useLocation = () => {
    const authContextValue = useContext(LocationContext);
    if (!authContextValue) {
        throw new Error("useLocation must be used inside LocationProvider");
    }

    return authContextValue;
};

export default useLocation
