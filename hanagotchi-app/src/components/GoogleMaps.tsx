
import React, { useEffect, useState } from 'react';
import BackgroundCard from './BackgroundCard';
import marker from '../assets/icons8-marker.png'
import { Image, StyleSheet, View } from 'react-native'
import MapView, { Details, Region, PROVIDER_GOOGLE } from 'react-native-maps'
import { DEFAULT_REGION } from '../contexts/LocationContext';
import useLocation from '../hooks/useLocation';
type EditLocationProps = {
    title: string;
    onRegionChange: ((region: Region) => void);
};

const EditLocation: React.FC<EditLocationProps> = ({ title, onRegionChange }) => {
    const [regionSelected, setRegionSelected] = useState<Region>(DEFAULT_REGION);
    const { location } = useLocation();

    const handleRegionChange = (new_region: Region, _: Details) => {
        setRegionSelected(new_region);
        onRegionChange(new_region);
    }

    // If the android geoLocation has changed: then update the MapView and the user's location with onRegionChange 
    useEffect(() => {
        if (location && regionSelected.latitude !== location.latitude && regionSelected.longitude !== location.longitude) {
            setRegionSelected({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: DEFAULT_REGION.latitudeDelta,
                longitudeDelta: DEFAULT_REGION.longitudeDelta
            });
            onRegionChange({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: DEFAULT_REGION.latitudeDelta,
                longitudeDelta: DEFAULT_REGION.longitudeDelta
            });
        }
    }, [location]);

    return (
        <BackgroundCard title={title} style_content={styles.contentCard} >
            <View style={styles.conteiner}>
                <View style={styles.conteiner}>
                    <MapView
                        style={styles.map}
                        initialRegion={DEFAULT_REGION}
                        region={regionSelected}
                        onRegionChangeComplete={handleRegionChange}
                        provider={PROVIDER_GOOGLE}
                    />

                    <View style={styles.markerFixed}>
                        <Image style={styles.marker} source={marker} />
                    </View>
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
