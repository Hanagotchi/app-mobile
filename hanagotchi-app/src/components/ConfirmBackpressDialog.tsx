import { useCallback, useRef } from "react";
import Dialog, { DialogRef } from "./Dialog";
import { BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

type ConfirmBackpressDialogProps = {
    goBack: () => void;
}

const ConfirmBackpressDialog: React.FC<ConfirmBackpressDialogProps> = ({goBack}) => {
    const dialogRef = useRef<DialogRef>(null);

    useFocusEffect(
        useCallback(() => {
          const onBackPress = () => {
            dialogRef.current?.showDialog();
            return true;
          };
    
          const subscription = BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress
          );
    
          return () => subscription.remove();
        }, [])
      );

      return (
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
      )
}

export default ConfirmBackpressDialog;