import Slider from "@react-native-community/slider"
import { BROWN_LIGHT, GREEN } from "../themes/globalThemes"
import { Image, View } from "react-native";
import BackgroundCard from "./BackgroundCard";

const emotions = {
    depressed: "https://firebasestorage.googleapis.com/v0/b/hanagotchi.appspot.com/o/private%2Fhanagotchis%2Fdepressed.png?alt=media&token=dd7d6025-8699-40d9-84f7-f1cb190589a5",
    happy: "https://firebasestorage.googleapis.com/v0/b/hanagotchi.appspot.com/o/private%2Fhanagotchis%2Fhappy.png?alt=media&token=d17131fe-02fd-440f-a1aa-695cc07830c2",
    overwhelmed: "https://firebasestorage.googleapis.com/v0/b/hanagotchi.appspot.com/o/private%2Fhanagotchis%2Foverwhelmed.png?alt=media&token=4b868dc9-4b6b-4a09-a7b7-42eb54b72324",
    relaxed: "https://firebasestorage.googleapis.com/v0/b/hanagotchi.appspot.com/o/private%2Fhanagotchis%2Frelaxed.png?alt=media&token=223e2f38-3a0a-4fef-9a81-fca8c1ca2fcc",
    sad: "https://firebasestorage.googleapis.com/v0/b/hanagotchi.appspot.com/o/private%2Fhanagotchis%2Fsad.png?alt=media&token=25c66b6e-b31f-4638-9d92-3775c9663324",
    uncomfortable: "https://firebasestorage.googleapis.com/v0/b/hanagotchi.appspot.com/o/private%2Fhanagotchis%2Funcomfortable.png?alt=media&token=d3460456-b47d-4170-a00a-0d4af4a552ee"
};

type AffectiveSliderProps = {
    question: string;
    value: number,
    setValue: (newValue: number) => void;
}

const AffectiveSlider: React.FC<AffectiveSliderProps> = ({question}) => {
    return (
        <BackgroundCard title={question}>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between", 
            }}>
                <Image source={{uri: emotions.sad}} style={{width: 30, height: 30}}/>
                <Slider 
                    style={{width: 200, height: 40}}
                    minimumTrackTintColor={BROWN_LIGHT}
                    thumbTintColor={BROWN_LIGHT}
                    minimumValue={1}
                    maximumValue={10}
                    onSlidingComplete={(value) => console.log(value)}
                />
                <Image source={{uri: emotions.happy}} style={{width: 30, height: 30}}/>
            </View>
        </BackgroundCard>
    )
}

export default AffectiveSlider;