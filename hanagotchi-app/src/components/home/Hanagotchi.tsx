import { Image, ImageBackground, TouchableWithoutFeedback } from "react-native"
import { Emotion } from "../../models/Hanagotchi"
import { useImperativeHandle, forwardRef } from "react";
import { Deviation } from "../../models/Measurement";
import useHanagotchi from "../../hooks/useHanagotchi";
import UserFeedbackDialog from "./UserFeedbackDialog";
import { Plant } from "../../models/Plant";
import { sources } from "./imageSources";

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
                    width: 250,
                    height: 311,
                    marginRight: 52,
                    zIndex: -1
                }}
            />
        </TouchableWithoutFeedback>
        </>
    )
});


export default Hanagotchi;