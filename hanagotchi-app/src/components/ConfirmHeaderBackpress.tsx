import { useRef } from "react";
import Dialog, { DialogRef } from "./Dialog";
import { Button } from "react-native-paper";

type ConfirmHeaderBackpressProps = {
    goBack: () => void;
}

const ConfirmHeaderBackpress: React.FC<ConfirmHeaderBackpressProps> = ({goBack}) => {
    const dialogRef = useRef<DialogRef>(null);

      return (
        <>
            <Dialog
                ref={dialogRef}
                title="¿Desea descartar los cambios?"
                content="Se perderán los cambios que no hayan sido confirmados"
                primaryButtonProps={{
                    onPress: goBack,
                }}
                secondaryButtonProps={{
                    onPress: () => dialogRef.current?.hideDialog(),
                }}
            />
            <Button 
                onPress={() => {
                dialogRef.current?.showDialog()
            }}/>
        </>
        )
}

export default ConfirmHeaderBackpress;