import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import * as DatePickerNative from 'react-native-date-picker';
import { Text } from 'react-native-paper';
import { BROWN_DARK } from '../themes/globalThemes';
import BackgroundCard from './BackgroundCard';
import { Entypo } from '@expo/vector-icons';

export const ARG_TIMEZONE_OFFSET = 60 * 1000;

type DateButtonProps = {
    title: string;
    userDate: Date | null;
    setDate: (date: Date) => void;
};

const CalendarIcon = (props: { color: string; size: number }) => (
    <Entypo name="calendar" size={props.size} color={props.color} />
);

const ArrowIcon = (props: { color: string; size: number }) => (
    <Entypo name="chevron-small-down" size={props.size} color={props.color} />
);

const DateButton: React.FC<DateButtonProps> = ({ title, userDate, setDate }) => {
    const [open, setOpen] = useState(false);
    const [selectedDate, setselectedDate] = useState<Date>(userDate || new Date());

    const handlePress = () => {
        setOpen(true);
    };

    const handleDateConfirm = (newDate: Date) => {
        newDate.setTime(newDate.getTime() + newDate.getTimezoneOffset() * ARG_TIMEZONE_OFFSET);
        setOpen(false);
        setDate(newDate);
        setselectedDate(newDate);
    };

    const handleDateCancel = () => {
        setOpen(false);
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'long', year: 'numeric' }).format(date.setTime(date.getTime() + date.getTimezoneOffset() * ARG_TIMEZONE_OFFSET));
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
                title="Selecciona tu fecha de nacimiento"
                modal
                open={open}
                date={selectedDate}
                onConfirm={handleDateConfirm}
                onCancel={handleDateCancel}
                mode="date"
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