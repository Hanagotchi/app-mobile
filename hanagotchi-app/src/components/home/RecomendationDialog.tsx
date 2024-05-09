import { useRef } from "react";
import { Plant } from "../../models/Plant";
import Dialog, { DialogRef } from "../Dialog";
import { FAB } from "react-native-paper";
import { StyleSheet } from "react-native";
import { RED, RED_LIGHT } from "../../themes/globalThemes";

type RecomendationDialogProps = {
    plant: Plant;
    recomendation: string;
}

const RecomendationDialog: React.FC<RecomendationDialogProps> = ({plant, recomendation}) => {
    const ref = useRef<DialogRef>(null);
    
    return (<>
        <Dialog 
            ref={ref}
            title={`¡${plant.name} no se siente muy bien!`}
            content={recomendation}
            onDismiss={() => ref.current?.hideDialog()}
        />
        <FAB 
            icon="exclamation-thick"
            onPress={() => ref.current?.showDialog()}
            style={style.fab}
            color="white"
        />
    </>)   
}

const style = StyleSheet.create({
    fab: {
        position: "absolute",
        top: 20,
        right: 20,
        backgroundColor: RED,
        borderRadius: 30,
    }
})

export default RecomendationDialog;