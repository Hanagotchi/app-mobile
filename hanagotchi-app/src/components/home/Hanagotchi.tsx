import { Image } from "react-native"
import { Emotion } from "../../models/Hanagotchi"
/* import { depressed } from "../../assets/hanagotchis/depressed.png";
import { happy } from "../../assets/hanagotchis/happy.png";
import { overwhelmed } from "../../assets/hanagotchis/overwhelmed.png";
import { relaxed } from "../../assets/hanagotchis/relaxed.png";
import { sad } from "../../assets/hanagotchis/sad.png";
import { uncomfortable } from "../../assets/hanagotchis/uncomfortable.png"; */


const sources = {
    depressed: "https://firebasestorage.googleapis.com/v0/b/hanagotchi.appspot.com/o/private%2Fhanagotchis%2Fdepressed.png?alt=media&token=dd7d6025-8699-40d9-84f7-f1cb190589a5",
    happy: "https://firebasestorage.googleapis.com/v0/b/hanagotchi.appspot.com/o/private%2Fhanagotchis%2Fhappy.png?alt=media&token=d17131fe-02fd-440f-a1aa-695cc07830c2",
    overwhelmed: "https://firebasestorage.googleapis.com/v0/b/hanagotchi.appspot.com/o/private%2Fhanagotchis%2Foverwhelmed.png?alt=media&token=4b868dc9-4b6b-4a09-a7b7-42eb54b72324",
    relaxed: "https://firebasestorage.googleapis.com/v0/b/hanagotchi.appspot.com/o/private%2Fhanagotchis%2Frelaxed.png?alt=media&token=223e2f38-3a0a-4fef-9a81-fca8c1ca2fcc",
    sad: "https://firebasestorage.googleapis.com/v0/b/hanagotchi.appspot.com/o/private%2Fhanagotchis%2Fsad.png?alt=media&token=25c66b6e-b31f-4638-9d92-3775c9663324",
    uncomfortable: "https://firebasestorage.googleapis.com/v0/b/hanagotchi.appspot.com/o/private%2Fhanagotchis%2Funcomfortable.png?alt=media&token=d3460456-b47d-4170-a00a-0d4af4a552ee"
}

type HanagotchiProps = {
    emotion: Emotion
}

const Hanagotchi: React.FC<HanagotchiProps> = ({emotion}) => {
    console.log(emotion)


    return (
        <Image 
            source={{
                uri: sources[emotion],
            }} 
            style={{
                width: 200,
                height: 200,
            }}
        />
    )
}


export default Hanagotchi;