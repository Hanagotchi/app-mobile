import { StyleSheet } from 'react-native';
import LoaderButton from "./../LoaderButton";
import React from "react";
import TextInput from "./../TextInput";
import DateButton, { ARG_TIMEZONE_OFFSET } from "./../DatePicker";
import { ReminderData } from '../../models/Reminder';

type EditReminderProps = {
    initValues?: ReminderData;
    onSubmit: ((data: ReminderData) => void);
    buttonLabel: string;

}

const newDateMinuteMultipleOf5 = () => {
    var now = new Date();
  
    var minutes = now.getMinutes();
    var minutesToAdd = 5 - (minutes % 5);
    
    if (minutesToAdd === 5) {
      minutesToAdd = 5;
    }
  
    now.setMinutes(minutes + minutesToAdd);
  
    now.setSeconds(0);
    now.setMilliseconds(0);
    return now;
};
  
  
const getDefaultData = () => ({
    content: "",
    date_time: newDateMinuteMultipleOf5()
});

const EditReminder: React.FC<EditReminderProps> = ({initValues, onSubmit, buttonLabel}) => {
    const [data, setData] = React.useState<ReminderData>(initValues ?? getDefaultData());

    const onChangeContent = (content: string) => setData((oldValues) => ({...oldValues, content}));
    const onChangeDateTime = (date_time: Date) => setData((oldValues) => ({...oldValues, date_time}))

    return (
        <>
            <TextInput label={`MENSAJE (*)`} value={data.content} onChangeText={onChangeContent} />
            <DateButton title="FECHA (*)" userDate={data.date_time} setDate={onChangeDateTime} mode='datetime' minuteInterval={5} minDate={newDateMinuteMultipleOf5()} />
            <LoaderButton
                mode="contained"
                uppercase style={styles.button}
                labelStyle={{ fontSize: 17 }}
                onPress={() => onSubmit(data)}
                disabled={data.content.length === 0}
            >
                {buttonLabel}
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