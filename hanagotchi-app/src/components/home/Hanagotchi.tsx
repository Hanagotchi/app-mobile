import { Image, ImageBackground, TouchableWithoutFeedback } from "react-native"
import { Emotion } from "../../models/Hanagotchi"
import depressed from "../../assets/hanagotchis/depressed.png";
import happy from "../../assets/hanagotchis/happy.png";
import overwhelmed from "../../assets/hanagotchis/overwhelmed.png";
import relaxed from "../../assets/hanagotchis/relaxed.png";
import sad from "../../assets/hanagotchis/sad.png";
import uncomfortable from "../../assets/hanagotchis/uncomfortable.png";
import backgroundBlob from "../../assets/hanagotchis/background_1.png";
import { useImperativeHandle, useState, forwardRef } from "react";
import { Deviation } from "../../models/Measurement";
import useTimeout from "../../hooks/useTimeout";
import { useHanagotchiApi } from "../../hooks/useHanagotchiApi";
import useHanagotchi from "../../hooks/useHanagotchi";

const sources = {
    depressed: depressed, 
    happy: happy, 
    overwhelmed: overwhelmed, 
    relaxed: relaxed, 
    sad: sad, 
    uncomfortable: uncomfortable,
    laughing: happy,
}

export type HanagotchiRef = {
    handleMeasurement: (deviations?: Deviation) => void;
    handleUserFeedback: (feedback: number) => void;
};

type HanagotchiProps = {
    initialEmotion: Emotion,
}

const Hanagotchi = forwardRef<HanagotchiRef, HanagotchiProps>((props, ref) => {
    const {
        emotion, 
        startTickling, 
        stopTickling,
        handleMeasurement,
        handleUserFeedback,
    } = useHanagotchi(props.initialEmotion);

    useImperativeHandle(ref, () => ({
        handleMeasurement,
        handleUserFeedback,
    }))

    return (
        <TouchableWithoutFeedback onPressIn={startTickling} onPressOut={stopTickling}>
            <Image 
                source={
                    sources[emotion]
                }
                style={{
                    width: 300,
                    height: 373,
                    marginRight: 60,
                    zIndex: -1
                }}
            />
        </TouchableWithoutFeedback>
    )
});


export default Hanagotchi;