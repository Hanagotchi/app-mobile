import { View, StyleSheet } from "react-native";
import { Plant } from "../../models/Plant"
import Hanagotchi, { HanagotchiRef } from "./Hanagotchi";
import PlantInfo from "./PlantInfo";
import {Text} from "react-native-paper";
import { BACKGROUND_COLOR } from "../../themes/globalThemes";
import RecomendationDialog from "./RecomendationDialog";
import { useRef, useState } from "react";
import { InfoToShow } from "../../models/InfoToShow";
import { getEmotionAndRecomendationFromDeviation } from "../../common/getEmotionAndRecomendationFromProcess";

type HomeContentProps = {
    plant: Plant,
    redirectToCreateLog: (plantId: number) => void;
}

const HomeContent: React.FC<HomeContentProps> = (props, ref) => {
    const [recomendation, setRecomendation] = useState<string | undefined>();
    const hanagotchiRef = useRef<HanagotchiRef>(null)

    const calculateEmotionBasedOnDeviation = (infoToShow: InfoToShow | null) => {
        if (infoToShow) {
            const {recomendation} = getEmotionAndRecomendationFromDeviation(infoToShow.info.deviations);
            setRecomendation(recomendation);
            hanagotchiRef.current?.handleMeasurement(infoToShow.info.deviations)
          } else {
            setRecomendation(undefined);
            hanagotchiRef.current?.handleMeasurement(undefined);
        }
    }

    return <>
        <Text style={style.title}>{props.plant.name}</Text>
        <View style={style.carrousel}>
            <Hanagotchi initialEmotion={"relaxed"} ref={hanagotchiRef}/>
            {recomendation && <RecomendationDialog 
                plant={props.plant}
                recomendation={recomendation}
            />}
        </View>
        <PlantInfo
            plant={props.plant}
            redirectToCreateLog={props.redirectToCreateLog}
            onChange={calculateEmotionBasedOnDeviation}
        />
    </>
}

const style = StyleSheet.create({
    title: {
        fontSize: 45,
        fontFamily: "IBMPlexMono_Italic",
        textAlign: 'center',
        color: '#4F4C4F',
        padding: 20
      },
    carrousel: {
      justifyContent: "center",
      alignItems: "center",
      height: 300,
      width: 300,
    },
});

export default HomeContent;