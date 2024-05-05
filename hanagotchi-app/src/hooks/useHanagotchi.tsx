import { useState } from "react";
import { Emotion } from "../models/Hanagotchi";
import useTimeout from "./useTimeout";
import { Deviation } from "../models/Measurement";

const FEEDBACK_EMOTION_DURATION = 1000 * 5;

function isDeviationEmotion(emotion: Emotion): boolean {
    return ["depressed", "drowned", "displeased", "overwhelmed", "annoyed"].includes(emotion)
}

function isFeedbackEmotion(emotion: Emotion): boolean {
    return ["happy", "sad"].includes(emotion)
}

function isTicklingEmotion(emotion: Emotion): boolean {
    return ["laughing", "uncomfortable"].includes(emotion)
}

const useHanagotchi = (initialEmotion: Emotion) => {

    const [prevEmotion, setPrevEmotion] = useState<Emotion>(initialEmotion);
    const [emotion, setEmotion] = useState<Emotion>(initialEmotion);
    const {start: startFeedbackEmotion, cancel: cancelFeedbackEmotion} = useTimeout();
    const {start: startTickleTimeout} = useTimeout();

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
    }

    return {
        emotion,
        handleMeasurement,
        handleUserFeedback,
        startTickling,
        stopTickling
    }

}

export default useHanagotchi;