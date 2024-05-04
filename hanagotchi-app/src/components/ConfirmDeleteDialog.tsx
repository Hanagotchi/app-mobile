import { useRef } from "react";
import { StyleSheet } from "react-native";
import Dialog, { DialogRef } from "./Dialog";

type ConfirmDeleteDialogProps = {
    onPress: () => void;
}


const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({ onPress }) => {
    const ref = useRef<DialogRef>(null);

    return (
        <Dialog 
            ref={ref}
            title="¿Desea eliminar el recordatorio?"
            content="Esta acción es irreversible"
            primaryButtonProps={{
                onPress: onPress,
            }}
            onDismiss={() => ref.current?.hideDialog()}
        />
    )   
}

export default ConfirmDeleteDialog;