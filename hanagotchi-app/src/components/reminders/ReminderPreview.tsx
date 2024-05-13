import { BROWN_LIGHT } from "../../themes/globalThemes";
import BackgroundCard from "../BackgroundCard";
import { StyleSheet, View } from 'react-native';
import { IconButton, Text } from "react-native-paper";
import { ARG_TIMEZONE_OFFSET } from "../DatePicker";
import deleteReminder from "../../assets/delete.png";
import edit from "../../assets/edit.png";
import { useRef, useState } from "react";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import { Reminder } from "../../models/Reminder";
import Dialog, { DialogRef } from "../Dialog";
import { useHanagotchiApi } from "../../hooks/useHanagotchiApi";


type ReminderPreviewProps = {
    id: number,
    date_time: Date;
    content: string;
    redirectToEditReminder: ((reminder: Reminder) => void) & Function;
    refreshScreenAfterDelete: () => void;
}
const ReminderPreview: React.FC<ReminderPreviewProps> = ({ id, date_time, content, redirectToEditReminder, refreshScreenAfterDelete }) => {
    const ref = useRef<DialogRef>(null);

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
    };
    const formatHour = (date: Date) => {
        return new Intl.DateTimeFormat('es-AR', { hour: '2-digit', minute: '2-digit' }).format(date);
    }

    const api = useHanagotchiApi();

    const submitDelete = async (reminderId: number) => {
        await api.deleteReminder(reminderId);
        ref.current?.hideDialog();
        refreshScreenAfterDelete();
    }
    return (
        <>
            <Dialog
                ref={ref}
                title={"¿Desear eliminar el recordatorio?"}
                content="Esta acción es irreversible"
                primaryButtonProps={{
                    onPress: (async () => {
                        await submitDelete(id);
                    })
                }}
                onDismiss={() => ref.current?.hideDialog()}
                secondaryButtonProps={{
                    onPress: () => {
                        ref.current?.hideDialog()
                    },
                }}
            />
            <BackgroundCard style_content={styles.content_card}>

                <View style={styles.icons}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.datetime}>{formatHour(date_time)}</Text>
                        <Text style={styles.datetime}> - </Text>
                        <Text style={styles.datetime}>{formatDate(date_time)}</Text>
                    </View>
                    <IconButton icon={edit} style={styles.icon} onPress={() => redirectToEditReminder({ id, date_time, content })}></IconButton>
                    <IconButton icon={deleteReminder} style={styles.icon} onPress={() => {
                        ref.current?.showDialog();
                    }}></IconButton>

                </View>
                <View style={styles.content}>
                    <Text>{content}</Text>
                </View>
            </BackgroundCard>
        </>


    )
};

const styles = StyleSheet.create({
    content_card: {
        padding: 15,
        minWidth: 300,
        justifyContent: 'space-between',
        maxWidth: 300,
    },
    content: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    datetime: {
        fontSize: 13,
        color: BROWN_LIGHT
    },
    icons: {
        flexDirection: 'row',
        position: 'relative',
        justifyContent: 'space-between',

    },
    icon: {
        width: 27,
        height: 27,
    }
});

export default ReminderPreview;
