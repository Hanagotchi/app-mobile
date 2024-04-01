import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Text } from 'react-native-paper';
import { BROWN_DARK } from '../themes/globalThemes';
import BackgroundCard from './BackgroundCard';
import { Entypo } from '@expo/vector-icons';

type DateButtonProps = {
    title: string;
    date?: string;
    setDate: (date: Date) => void;
};

const CalendarIcon = (props: { color: string; size: number }) => (
    <Entypo name="calendar" size={props.size} color={props.color} />
);

const ArrowIcon = (props: { color: string; size: number }) => (
    <Entypo name="chevron-small-down" size={props.size} color={props.color} />
);

const DateButton: React.FC<DateButtonProps> = ({ title, date, setDate }) => {
    const [open, setOpen] = useState(false);
    const [dateSelected, setDateSelected] = useState<Date>(date ? new Date(date) : new Date());

    const handlePress = () => {
        setOpen(true);
    };

    const handleDateConfirm = (newDate: Date) => {
        setDateSelected(newDate);
        setOpen(false);
        setDate(dateSelected);
    };

    const handleDateCancel = () => {
        setOpen(false);
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
    };

    return (
        <BackgroundCard title={title}>
            <TouchableOpacity
                onPress={handlePress}
                style={styles.touchableOpacityContainer}
            >
                <View style={styles.dateContent}>
                    <CalendarIcon color={BROWN_DARK} size={25} />
                    <Text style={styles.dateText}>{formatDate(dateSelected)}</Text>
                </View>
                <ArrowIcon color={BROWN_DARK} size={25} />
            </TouchableOpacity>
            <DatePicker
                title="Selecciona tu fecha de nacimiento"
                modal
                open={open}
                date={dateSelected}
                onConfirm={handleDateConfirm}
                onCancel={handleDateCancel}
                mode="date"
                onDateChange={() => console.log("xd")}
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