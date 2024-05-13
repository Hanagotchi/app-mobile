import { useEffect, useMemo, useState } from "react";
import { Emotion } from "../models/Hanagotchi";
import useTimeout from "./useTimeout";
import { Deviation } from "../models/Measurement";
import { Plant } from "../models/Plant";

const FEEDBACK_EMOTION_DURATION = 1000 * 60;

function isDeviationEmotion(emotion: Emotion): boolean {
    return ["depressed", "drowned", "displeased", "overwhelmed", "annoyed"].includes(emotion)
}

function isFeedbackEmotion(emotion: Emotion): boolean {
    return ["happy", "sad"].includes(emotion)
}

function isTicklingEmotion(emotion: Emotion): boolean {
    return ["laughing", "uncomfortable"].includes(emotion)
}

const useHanagotchi = (plant: Plant, initialEmotion: Emotion) => {

    const [prevEmotion, setPrevEmotion] = useState<Emotion>("relaxed");
    const [emotion, setEmotion] = useState<Emotion>("relaxed");
    const {start: startFeedbackEmotion, cancel: cancelFeedbackEmotion} = useTimeout();
    const {start: startTickleTimeout} = useTimeout();
    const [feedbackDialogEnabled, setFeedbackDialogEnabled] = useState<boolean>(false);

    const updateEmotion = (newEmotion: Emotion) => {
        if (isDeviationEmotion(newEmotion)) cancelFeedbackEmotion()
        setPrevEmotion(emotion);
        setEmotion(newEmotion);
    }

    const handleMeasurement = (deviations?: Deviation) => {
        if (!deviations) {
            if (!isDeviationEmotion(emotion)) return;
            updateEmotion("relaxed");
            return;
        }
      
        const {
            humidity,
            temperature,
            light,
            watering
        } = deviations!;
    
        if (watering === "lower") {
            updateEmotion("depressed");
            return;
        }
    
        if (light === "higher" && temperature === "higher") {
            updateEmotion("overwhelmed");
            return;
        }
    
        if (light === "lower" && temperature === "lower") {
            updateEmotion("displeased");
            return;
        }

        if (light === "higher" || temperature === "higher") {
            updateEmotion("overwhelmed");
            return;
        } else if (light === "lower" || temperature === "lower") {
            updateEmotion("displeased");
            return;
        }

        if (humidity === "lower") {
            updateEmotion("annoyed");
        }

        if (watering === "higher") {
            updateEmotion("drowned");
            return;
        }

        if (!isDeviationEmotion(emotion)) return;
        updateEmotion("relaxed");
    }

    const startTickling = () => {
        if (["relaxed", "happy", "sleepy"].includes(emotion)) updateEmotion("laughing");
        if (emotion === "sad") updateEmotion("uncomfortable");
    }

    const stopTickling = () => {
        startTickleTimeout(() => {
            if (isTicklingEmotion(emotion)) {
                if (prevEmotion === "sleepy") {
                    updateEmotion("relaxed")
                } else {
                    updateEmotion(prevEmotion)
                }
            }
        }, 500);
    }

    const handleUserFeedback = (feedback: number) => {
        feedback >= 5 ? updateEmotion("happy") : updateEmotion("sad");
        startFeedbackEmotion(() => updateEmotion("relaxed"), FEEDBACK_EMOTION_DURATION);
        setFeedbackDialogEnabled(false);
    }

    useEffect(() => {
        setFeedbackDialogEnabled((prev) => prev && (emotion === "relaxed" || emotion === "laughing"))
    }, [emotion])

    // Won't ask for feedback if it is not relaxed
    const askUserForFeedback = () => {
        setFeedbackDialogEnabled(emotion === "relaxed" || emotion === "laughing");
    }

    return {
        emotion,
        feedbackDialogEnabled,
        handleMeasurement,
        handleUserFeedback,
        startTickling,
        stopTickling,
        askUserForFeedback,
    }

}

export default useHanagotchi;