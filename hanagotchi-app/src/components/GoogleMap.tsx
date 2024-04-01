import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import MapView, { Details, Region, PROVIDER_GOOGLE } from 'react-native-maps'
import marker from '../assets/icons8-marker.png'
import { FIUBA_REGION } from '../contexts/LocationContext';

type EditLocationProps = {
  region: Region;
  onRegionChange: ((region: Region, details: Details) => void)
};

const GoogleMap: React.FC<EditLocationProps> = ({ region, onRegionChange }) => {
  return (
    <View style={styles.conteiner}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={onRegionChange}
        provider={PROVIDER_GOOGLE}
      />
      <View style={styles.markerFixed}>
        <Image style={styles.marker} source={marker} />
      </View>
    </View>
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
  }
})

export default GoogleMap;
