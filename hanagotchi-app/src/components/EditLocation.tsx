import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { BROWN_DARK } from '../themes/globalThemes';
import BackgroundCard from './BackgroundCard';
import { Entypo } from '@expo/vector-icons';
import { LocationUser } from '../models/LocationUser';

type EditLocationProps = {
    title: string;
    location: LocationUser | null;
    onRequestLocation: (() => void) & Function;
};

const UbicationIcon = (props: { color: string; size: number }) => (
    <Entypo name="location" size={props.size} color={props.color} />
);

const EditLocation: React.FC<EditLocationProps> = ({ title, onRequestLocation, location }) => {
    return (
        <BackgroundCard title={title}>
            <TouchableOpacity
                onPress={onRequestLocation}
                style={styles.touchableOpacityContainer}
            >
                <UbicationIcon color={BROWN_DARK} size={22} />
                <Text style={styles.dateText}>{location?.geoName?? '--'}</Text>

            </TouchableOpacity>
        </BackgroundCard>
    );
};

const styles = StyleSheet.create({
    touchableOpacityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 16,
        color: BROWN_DARK,
        marginLeft: 10, // Add some space between the icon and text
    },
});

export default EditLocation;
