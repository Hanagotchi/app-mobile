import { Image, ImageBackground, TouchableWithoutFeedback } from "react-native"
import { Emotion } from "../../models/Hanagotchi"
import depressed from "../../assets/hanagotchis/depressed.png";
import happy from "../../assets/hanagotchis/happy.png";
import overwhelmed from "../../assets/hanagotchis/overwhelmed.png";
import relaxed from "../../assets/hanagotchis/relaxed.png";
import sad from "../../assets/hanagotchis/sad.png";
import uncomfortable from "../../assets/hanagotchis/uncomfortable.png";
import annoyed from "../../assets/hanagotchis/annoyed.png";
import drowned from "../../assets/hanagotchis/drowned.png";
import backgroundBlob from "../../assets/hanagotchis/background_1.png";
import { useImperativeHandle, forwardRef } from "react";
import { Deviation } from "../../models/Measurement";
import useHanagotchi from "../../hooks/useHanagotchi";
import UserFeedbackDialog from "./UserFeedbackDialog";
import { Plant } from "../../models/Plant";

const sources = {
    depressed: depressed, 
    annoyed: annoyed,
    drowned: drowned,
    happy: happy, 
    overwhelmed: overwhelmed, 
    relaxed: relaxed, 
    sad: sad, 
    uncomfortable: uncomfortable,
    laughing: happy,
}

export type HanagotchiRef = {
    handleMeasurement: (deviations?: Deviation) => void;
    askUserForFeedback: () => void;
};

type HanagotchiProps = {
    plant: Plant,
    initialEmotion: Emotion,
}

const Hanagotchi = forwardRef<HanagotchiRef, HanagotchiProps>((props, ref) => {
    const {
        emotion,
        feedbackDialogEnabled,
        startTickling, 
        stopTickling,
        handleMeasurement,
        askUserForFeedback,
        handleUserFeedback,

    } = useHanagotchi(props.plant, props.initialEmotion);

    useImperativeHandle(ref, () => ({
        handleMeasurement,
        askUserForFeedback,
    }))

    return (<>
        {feedbackDialogEnabled && <UserFeedbackDialog plant={props.plant} onConfirm={handleUserFeedback}/>}
        <TouchableWithoutFeedback onPressIn={startTickling} onPressOut={stopTickling}>
            <Image 
                source={
                    emotion ? sources[emotion] : sources["relaxed"]
                }
                style={{
                    width: 300,
                    height: 373,
                    marginRight: 60,
                    zIndex: -1
                }}
            />
        </TouchableWithoutFeedback>
        </>
    )
});


export default Hanagotchi;