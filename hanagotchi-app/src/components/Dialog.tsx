import { StyleSheet } from "react-native";
import { Portal, Dialog as NativeDialog, DialogProps as NativeDialogProps, Text, Divider, Button, ButtonProps} from "react-native-paper";
import { BACKGROUND_COLOR, BEIGE_DARK, BLACK, BROWN, BROWN_DARK, BROWN_LIGHT } from "../themes/globalThemes";
import { forwardRef, useImperativeHandle, useState } from "react";

export type DialogRef = {
    showDialog: () => void;
    hideDialog: () => void;
}

type DialogProps = Omit<NativeDialogProps, "children" | "style" | "visible"> & {
    title: string;
    content: string;
    primaryButtonLabel?: string;
    secondaryButtonLabel?: string;
    primaryButtonProps?:  Omit<ButtonProps, "children">;
    secondaryButtonProps?: Omit<ButtonProps, "children">;
};

const Dialog = forwardRef<DialogRef, DialogProps>((props, ref) => {
    const [open, setOpen] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
        showDialog: () => setOpen(true),
        hideDialog: () => setOpen(false),
    }));

    return <Portal>
        <NativeDialog visible={open} {...props} style={style.dialog}>
            <NativeDialog.Title style={style.dialogTitle}>
                <Text style={style.title}>{props.title}</Text>
            </NativeDialog.Title>
            <Divider bold/>
            <NativeDialog.Content style={style.dialogContent}>
                <Text style={style.content}>{props.content}</Text>
            </NativeDialog.Content>
            <NativeDialog.Actions style={style.dialogActions}>
                {props.secondaryButtonProps && (
                    <Button 
                        mode="contained" 
                        buttonColor={BEIGE_DARK}
                        textColor={BROWN_DARK}
                        style={style.button} 
                        labelStyle={style.buttonText}
                        {...props.secondaryButtonProps}
                    >
                        {props.secondaryButtonLabel ?? "CANCELAR"}
                    </Button>
                )}
                <Button 
                    mode="contained"
                    buttonColor={BROWN_LIGHT}
                    style={style.button} 
                    labelStyle={style.buttonText}
                    {...props.primaryButtonProps}
                >
                    {props.primaryButtonLabel ?? "CONFIRMAR"}
                </Button>
                
            </NativeDialog.Actions>
        </NativeDialog>
    </Portal>
});

const style = StyleSheet.create({
    dialog: {
        backgroundColor: BACKGROUND_COLOR,
        borderRadius: 10,
    },
    dialogTitle: {
        marginTop: 16,
        marginBottom: 16,
        marginHorizontal: 18,
    },
    dialogContent: {
        paddingTop: 16,
        paddingBottom: 18,
        paddingHorizontal: 50,
    },
    dialogActions: {
        gap: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: BLACK,
    },
    content: {
        color: BROWN,
        textAlign: "center",
    },
    button: {
        borderRadius: 10,
        flexGrow: 1,
        height: 40,
        width: "40%",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 15,
    }
});

export default Dialog;
