import { Emotion } from "../models/Hanagotchi";
import { Deviation } from "../models/Measurement";

export function getEmotionAndRecomendationFromDeviation(deviations?: Deviation): string[] {
    const recomendations: string[] = [];
    if (!deviations) return recomendations;
    
  
    const {
    humidity,
    temperature,
    light,
    watering
    } = deviations!;

    if (watering === "lower") {
        recomendations.push("¡Riegala un poco para que pueda sentirse mas fuerte!")
    }

    if (watering === "higher") {
        recomendations.push("¡Tiene demasiada agua! Espera unas horas sin regarla hasta que absorba el agua.")
    }

    if (light === "higher" || temperature === "higher") {
        recomendations.push("Muevela lejos del Sol, hacia algun lugar con sombra, o tambien dentro de tu hogar.")
    } else if (light === "lower" || temperature === "lower") {
        recomendations.push("¡Llevala al patio para que tome un poco de Sol! Tambien puedes colocarla cerca de una ventana.");
    }

    if (humidity === "lower") {
        recomendations.push("¡Riegala un poco para que pueda sentirse mas fuerte!")
    }

    return recomendations;
}