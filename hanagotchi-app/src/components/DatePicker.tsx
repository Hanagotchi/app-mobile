import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import * as DatePickerNative from 'react-native-date-picker';
import { Text } from 'react-native-paper';
import { BROWN_DARK } from '../themes/globalThemes';
import BackgroundCard from './BackgroundCard';
import { Entypo } from '@expo/vector-icons';

export const ARG_TIMEZONE_OFFSET = 60 * 1000;
export const ARG_TIMEZONE_OFFSET_IN_MINUTES = -3 * 60;

type DateButtonProps = {
    title: string;
    userDate: Date | null;
    setDate: (date: Date) => void;
    mode?: 'date' | 'time' | 'datetime';
    minDate?: Date;
    minuteInterval?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30;
};

const CalendarIcon = (props: { color: string; size: number }) => (
    <Entypo name="calendar" size={props.size} color={props.color} />
);

const ArrowIcon = (props: { color: string; size: number }) => (
    <Entypo name="chevron-small-down" size={props.size} color={props.color} />
);


const DateButton: React.FC<DateButtonProps> = ({ title, userDate, setDate, mode = 'date', minDate = undefined, minuteInterval = undefined}) => {
    const [open, setOpen] = useState(false);
    const [selectedDate, setselectedDate] = useState<Date>(userDate ?? new Date());
    
    const handlePress = () => {
        setOpen(true);
    };

    const handleDateConfirm = (newDate: Date) => {
        setOpen(false);
        setDate(newDate);
        setselectedDate(newDate);
    };

    const handleDateCancel = () => {
        setOpen(false);
    };

    const formatDate = (datetime: Date) => {
        let date = new Date(datetime);
        if (mode === 'date') {
            date.setTime(date.getTime() + date.getTimezoneOffset() * ARG_TIMEZONE_OFFSET);
            return new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
        } else {
            return new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
        }
    };

    return (
        <BackgroundCard title={title}>
            <TouchableOpacity
                onPress={handlePress}
                style={styles.touchableOpacityContainer}
            >
                <View style={styles.dateContent}>
                    <CalendarIcon color={BROWN_DARK} size={25} />
                    <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
                </View>
                <ArrowIcon color={BROWN_DARK} size={25} />
            </TouchableOpacity>
            <DatePickerNative.default
                title="Selecciona una fecha"
                modal
                open={open}
                date={selectedDate}
                onConfirm={handleDateConfirm}
                onCancel={handleDateCancel}
                mode={mode}
                minimumDate={minDate}
                minuteInterval={minuteInterval}
                timeZoneOffsetInMinutes={mode === 'date' ? 0 : ARG_TIMEZONE_OFFSET_IN_MINUTES}
            />
        </BackgroundCard>
    );
};

const styles = StyleSheet.create({
    touchableOpacityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Align items with space between them
    },
    dateContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 16,
        color: BROWN_DARK,
        marginLeft: 10, // Add some space between the icon and text
    },
});

export default DateButton;