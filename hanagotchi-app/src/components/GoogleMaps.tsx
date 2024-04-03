import React from 'react';
import BackgroundCard from './BackgroundCard';
import marker from '../assets/icons8-marker.png'
import { Image, StyleSheet, View } from 'react-native'
import MapView, { Details, Region, PROVIDER_GOOGLE } from 'react-native-maps'
import { DEFAULT_REGION } from '../contexts/LocationContext';

type EditLocationProps = {
    title: string;
    region: Region;
    onRegionChange: ((region: Region, details: Details) => void);
};

const EditLocation: React.FC<EditLocationProps> = ({ title, region, onRegionChange }) => {
    return (
        <BackgroundCard title={title} style_content={styles.contentCard} >
            <View style={styles.conteiner}>
                <MapView
                    style={styles.map}
                    initialRegion={DEFAULT_REGION}
                    region={region}
                    onRegionChangeComplete={onRegionChange}
                    provider={PROVIDER_GOOGLE}
                />
                <View style={styles.markerFixed}>
                    <Image style={styles.marker} source={marker} />
                </View>
            </View>
        </BackgroundCard>
    );
};

const styles = StyleSheet.create({
    conteiner: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10

    },
    map: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 5,
        bottom: 0,
    },
    markerFixed: {
        left: '50%',
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
        top: '50%'
    },
    marker: {
        height: 39,
        width: 39
    },
    contentCard: {
        paddingTop: 150,
    },
});

export default EditLocation;
