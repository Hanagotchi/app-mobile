import { useState } from "react";

const useTimeout = () => {
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const start = (callback: () => void, delay: number) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(callback, delay);
        setTimeoutId(newTimeoutId);
    }
    
    const cancel = () => {
        if (!timeoutId) return;
        clearTimeout(timeoutId);
        setTimeoutId(null);
    };
    return {start, cancel};
}

export default useTimeout