import { useRef } from "react";
import { Plant } from "../../models/Plant";
import Dialog, { DialogRef } from "../Dialog";
import { FAB } from "react-native-paper";
import { StyleSheet } from "react-native";
import { BROWN, RED } from "../../themes/globalThemes";
import { Text } from "react-native-paper";

type RecomendationDialogProps = {
    plant: Plant;
    recomendations: string[];
}

const RecomendationDialog: React.FC<RecomendationDialogProps> = ({plant, recomendations}) => {
    const ref = useRef<DialogRef>(null);
    
    return (<>
        <Dialog 
            ref={ref}
            title={`¡${plant.name} no se siente muy bien!`}
            onDismiss={() => ref.current?.hideDialog()}
            primaryButtonLabel="Ok"
            primaryButtonProps={{
                onPress: () => ref.current?.hideDialog()
            }}       
        >
            <Text style={{...style.content, marginBottom: 10}}>Aqui tienes algunas recomendaciones:</Text>
            {recomendations.map((r, index) =>
                <Text key={index} style={style.content}>• {r}</Text>
            )}
        </Dialog>
        <FAB
            key={plant.id} 
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
    },
    content: {
        color: BROWN,
        textAlign: "left",
    },
})

export default RecomendationDialog;