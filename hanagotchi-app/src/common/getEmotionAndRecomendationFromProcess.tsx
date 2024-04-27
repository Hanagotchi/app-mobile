import { Emotion } from "../models/Hanagotchi";
import { Deviation } from "../models/Measurement";

export function getEmotionAndRecomendationFromDeviation(deviations?: Deviation): {emotion: Emotion, recomendation?: string} {
    if (!deviations) {
        return {
            emotion: "relaxed"
        };
    }
  
    const {
    temperature,
    light,
    watering
    } = deviations!;

    if (watering === "lower") {
        return {
            emotion: "depressed",
            recomendation: "¡Riegala un poco para que pueda sentirse mas fuerte!"
        };
    }

    if (light === "higher" && temperature === "higher") {
        return {
            emotion: "overwhelmed",
            recomendation: "Muevela lejos del Sol, hacia algun lugar con sombra, o tambien dentro de tu hogar."
        };
    }

    if (light === "lower" && temperature === "lower") {
        return {
            emotion: "uncomfortable",
            recomendation: "¡Llevala al patio para que tome un poco de Sol! Tambien puedes colocarla cerca de una ventana."
        };
    }

    return {emotion: "relaxed"};
}