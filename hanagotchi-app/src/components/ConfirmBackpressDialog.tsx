import { useEffect, useRef, useState } from "react";
import Dialog, { DialogRef } from "./Dialog";
import { NavigationAction, useNavigation } from "@react-navigation/native";

const ConfirmBackpressDialog: React.FC = () => {
    const dialogRef = useRef<DialogRef>(null);
    const navigation  = useNavigation();
    const [beforeRemoveEvent, setBeforeRemoveEvent] = useState<{ data: { action: NavigationAction } } | null>(null);

    useEffect(() => {
          const unsubscribe = navigation.addListener("beforeRemove", (e) => {
            e.preventDefault();
            setBeforeRemoveEvent(e)
            dialogRef.current?.showDialog();
          });
    
          return unsubscribe;
    }, [navigation]);

      return (
        <Dialog
            ref={dialogRef}
            title="¿Desea descartar los cambios?"
            content="Se perderán los cambios que no hayan sido confirmados"
            primaryButtonProps={{
                onPress: () => {
                    if (beforeRemoveEvent) {
                        navigation.dispatch(beforeRemoveEvent.data.action)
                    }
                },
            }}
            secondaryButtonProps={{
                onPress: () => {
                    dialogRef.current?.hideDialog()
                },
            }}
        />
      )
}

export default ConfirmBackpressDialog;