import { StyleSheet } from 'react-native';
import LoaderButton from "./../LoaderButton";
import React from "react";
import TextInput from "./../TextInput";
import DateButton from "./../DatePicker";
import { Region } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import { Text } from 'react-native-paper';

type EditReminderProps = {
    name_button: string;
    content_received?: string;
    datetime_received?: Date,
    onPressCompleteEdit: ((() => void) & Function);
    setContent: ((content: string) => void) & Function;
    setDateTime: ((date: Date) => void) & Function;
}

const EditReminder: React.FC<EditReminderProps> = ({ name_button, content_received, datetime_received, onPressCompleteEdit, setContent, setDateTime }) => {
    const [requeriedFieldMessage, setRequeriedFieldMessage] = React.useState<string | null>(null);

    const handleOnComplete = async () => {
        if (!content_received && content_received === '') {
            setRequeriedFieldMessage('El mensaje es requerido');
        } else if (!datetime_received) {
            setRequeriedFieldMessage('La fecha es requerida');
        }else {
            setRequeriedFieldMessage(null);
            onPressCompleteEdit();
        }

    }
    const handleBirthDay = async (date: Date) => {
        setDateTime(new Date(date.toISOString().split('T')[0]));
    }

    return (
        <>
            <TextInput label={`MENSAJE (*)`} value={content_received ?? ''} onChangeText={setContent} />
            <DateButton title="FECHA (*)" userDate={datetime_received ?? new Date()} setDate={handleBirthDay} mode='datetime' />
            
            {requeriedFieldMessage ? <Text style={styles.requiredField}>{requeriedFieldMessage}</Text> : null}


            <LoaderButton
                mode="contained"
                uppercase style={styles.button}
                onPress={handleOnComplete}
                labelStyle={{ fontSize: 17 }}
            >
                {name_button}
            </LoaderButton>
        </>
    )
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        width: "50%",
        height: 50,
        alignItems: 'center',
        justifyContent: "center",
        alignSelf: "center",
    },
    requiredField: {
        color: 'red',
        textAlign: 'center'
    }
});

export default EditReminder;