import { useContext } from "react";
import { HanagotchiApi } from "../services/hanagotchiApi";
import { HanagotchiApiContext } from "../contexts/HanagotchiServiceContext";

export const useHanagotchiApi = (): HanagotchiApi => {
    const hanagotchiContextValue = useContext(HanagotchiApiContext);
    if (!hanagotchiContextValue) {
      throw new Error("useHanagotchiApi must be used inside HanagotchiApiProvider");
    }
    return hanagotchiContextValue;
  };