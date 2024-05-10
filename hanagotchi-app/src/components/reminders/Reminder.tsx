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
import Dialog, { DialogRef } from "../../components/Dialog";


type ReminderDetailsProps = {
    id: number,
    date_time: Date;
    content: string;
    redirectToEditReminder: ((reminder: Reminder) => void) & Function;
    openDialog: () => void;
}
const ReminderDetail: React.FC<ReminderDetailsProps> = ({ id, date_time, content, redirectToEditReminder, openDialog }) => {
    const ref = useRef<DialogRef>(null);

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'long', year: 'numeric' }).format(date.setTime(date.getTime() + date.getTimezoneOffset() * ARG_TIMEZONE_OFFSET));
    };
    const formatHour = (date: Date) => {
        return new Intl.DateTimeFormat('es-AR', { hour: '2-digit', minute: '2-digit' }).format(date.setTime(date.getTime() + date.getTimezoneOffset() * ARG_TIMEZONE_OFFSET));
    }

    const handleDeleteReminder = () => {
        console.log('delete reminder with id: ', id);
    }

    return (
        <>
            <Dialog
                ref={ref}
                title="¿Desea eliminar el recordatorio?"
                content="Esta acción es irreversible"
                primaryButtonProps={{
                    onPress: (() => { console.log("Delete reminder with id: ", id) })
                }}
                onDismiss={() => ref.current?.hideDialog()}
            />
            <BackgroundCard style_content={styles.content_card}>
                <View style={styles.icons}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.datetime}>{formatHour(new Date(date_time))}</Text>
                        <Text style={styles.datetime}> - </Text>
                        <Text style={styles.datetime}>{formatDate(new Date(date_time))}</Text>
                    </View>
                    <IconButton icon={edit} style={styles.icon} onPress={() => redirectToEditReminder({ id, date_time, content })}></IconButton>
                    <IconButton icon={deleteReminder} style={styles.icon} onPress={() =>

                        ref.current?.showDialog()}></IconButton>

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
        padding: 50,
        minWidth: 300,
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
        padding: 10,
        flexDirection: 'row',
        position: 'absolute',
        top: 5,
        right: 5,

    },
    icon: {
        width: 27,
        height: 27,
    }
});

export default ReminderDetail;