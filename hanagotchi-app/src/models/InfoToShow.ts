import { Deviation } from "./Measurement";

export type InfoToShow = {
    origin: "Hanagotchi" | "OpenWeather",
    info: {
        temperature?: number;
        humidity?: number;
        light?: number;
        watering?: number;
        deviations?: Deviation;
        time_stamp?: Date;
    }
}