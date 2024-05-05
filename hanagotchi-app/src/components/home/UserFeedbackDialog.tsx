import { useRef, useState } from "react";
import { Plant } from "../../models/Plant";
import Dialog, { DialogRef } from "../Dialog";
import { FAB, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { BROWN, GREEN } from "../../themes/globalThemes";
import AffectiveSlider from "../AffectiveSlider";

type UserFeedbackDialogProps = {
    plant: Plant;
    onConfirm: (feedback: number) => void;
}

const UserFeedbackDialog: React.FC<UserFeedbackDialogProps> = ({plant, onConfirm}) => {
    const ref = useRef<DialogRef>(null);
    const [feedback, setFeedback] = useState<number>(5)

    const handleSubmit = () => {
        onConfirm(feedback);
        ref.current?.hideDialog();
    }
    
    return (<>
        <Dialog 
            ref={ref}
            title={`¡${plant.name} te esta observando!`}
            onDismiss={() => ref.current?.hideDialog()}
            primaryButtonLabel="Confirmar"
            primaryButtonProps={{
                onPress: handleSubmit
            }}
            secondaryButtonLabel="Cancelar"
            secondaryButtonProps={{
                onPress: () => ref.current?.hideDialog(),
            }}    
        >   
            <View style={{gap: 10}}>
                <Text style={{
                    color: BROWN,
                    textAlign: "center",
                }}>Exprésale cómo te sientes</Text>
                <AffectiveSlider question="" value={feedback} setValue={setFeedback}/>
            </View>
        </Dialog>
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
        bottom: 20,
        left: 20,
        backgroundColor: GREEN,
        borderRadius: 30,
    }
})

export default UserFeedbackDialog;