import { View, StyleSheet } from "react-native";
import { Plant } from "../../models/Plant"
import Hanagotchi, { HanagotchiRef } from "./Hanagotchi";
import PlantInfo from "./PlantInfo";
import {Text} from "react-native-paper";
import RecomendationDialog from "./RecomendationDialog";
import { useEffect, useRef, useState } from "react";
import { InfoToShow } from "../../models/InfoToShow";
import { getEmotionAndRecomendationFromDeviation } from "../../common/getEmotionAndRecomendationFromProcess";

const ASK_FOR_FEEDBACK_PROBABILITY = 0.05;

type HomeContentProps = {
    plant: Plant,
    redirectToCreateLog: (plantId: number) => void;
}

const HomeContent: React.FC<HomeContentProps> = ({plant, redirectToCreateLog}) => {
    const [recomendations, setRecomendations] = useState<string[] | undefined>();
    const hanagotchiRef = useRef<HanagotchiRef>(null);

    const calculateEmotionBasedOnDeviation = (infoToShow: InfoToShow | null) => {
        if (infoToShow) {
            const recomendationList = getEmotionAndRecomendationFromDeviation(infoToShow.info.deviations);
            setRecomendations(recomendationList);
            hanagotchiRef.current?.handleMeasurement(infoToShow.info.deviations)
          } else {
            setRecomendations(undefined);
            hanagotchiRef.current?.handleMeasurement(undefined);
        }
    }

    useEffect(() => {
        const randomValue = Math.floor((Math.random() * (1 / ASK_FOR_FEEDBACK_PROBABILITY)));
        if (randomValue === plant.id % (1 / ASK_FOR_FEEDBACK_PROBABILITY)) {
            hanagotchiRef.current?.askUserForFeedback();
        }
    }, [])

    return <View style={{alignItems: "center"}}>
        <Text style={style.title}>{plant.name}</Text>
        <View style={style.carrousel}>
            <Hanagotchi plant={plant} initialEmotion={"relaxed"} ref={hanagotchiRef}/>
            {recomendations && recomendations.length > 0 && <RecomendationDialog 
                plant={plant}
                recomendations={recomendations}
            />}
        </View>
        <PlantInfo
            plant={plant}
            redirectToCreateLog={redirectToCreateLog}
            onChange={calculateEmotionBasedOnDeviation}
        />
    </View>
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