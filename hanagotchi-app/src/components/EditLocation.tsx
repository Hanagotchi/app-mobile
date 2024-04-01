import React from 'react';
import { StyleSheet } from 'react-native';
import BackgroundCard from './BackgroundCard';
import GoogleMap from './GoogleMap';
import { Details, Region } from 'react-native-maps';

type EditLocationProps = {
    title: string;
    region: Region;
    onRegionChange: ((region: Region, details: Details) => void);
};

const EditLocation: React.FC<EditLocationProps> = ({ title, region, onRegionChange }) => {
    return (
        <BackgroundCard title={title} style_content={styles.contentCard} >
            <GoogleMap region={region} onRegionChange={onRegionChange} />
        </BackgroundCard>
    );
};

const styles = StyleSheet.create({
    contentCard: {
        paddingTop: 150,
    },
});

export default EditLocation;
