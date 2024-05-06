import * as React from 'react';
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native'
import {BACKGROUND_COLOR, BROWN_DARK} from "../themes/globalThemes";
import left from "../assets/vector2.png";
import right from "../assets/vector1.png";
import {ActivityIndicator, IconButton, FAB} from "react-native-paper";
import {useHanagotchiApi} from "../hooks/useHanagotchiApi";
import { useEffect, useMemo, useRef, useState} from "react";
import NoContent from "../components/NoContent";
import { useSession } from '../hooks/useSession';
import { CompositeScreenProps } from '@react-navigation/native';
import { MainTabParamsList, RootStackParamsList } from '../navigation/Navigator';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusApiFetch } from '../hooks/useFocusApiFetch';
import HomeContent from '../components/home/HomeContent';
import Carousel from 'react-native-snap-carousel';
import { Plant } from '../models/Plant';


type HomeScreenProps = CompositeScreenProps<
    BottomTabScreenProps<MainTabParamsList, "Home">,
    NativeStackScreenProps<RootStackParamsList>
>;

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const api = useHanagotchiApi();
  const userId = useSession((state) => state.session!.userId);
  let [currentPlant, setCurrentPlant] = useState(0);
  const carouselRef = useRef<Carousel<Plant>>(null);

  const {isFetching, fetchedData: plants, error} = useFocusApiFetch(
      () => api.getPlants({id_user: userId}),
      [{
        id: 0,
        id_user: 0,
        name: '',
        scientific_name: '',
      }]
  );

  function redirectToCreateLog(plantId: number) {
    navigation.navigate("CreateLog", {plantId})
  }

  if (!isFetching && error) {
    throw error;
  }

  function nextPlant() {
    setCurrentPlant(i => i+1);
    carouselRef.current?.snapToNext();
  }

  function previousPlant() {
    setCurrentPlant(i => i-1);
    carouselRef.current?.snapToPrev();
  }

  if (plants.length == 0 && !isFetching) return (
      <View style={{margin: 100}}>
        <NoContent/>
      </View>
  )

  if (isFetching) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
        <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={{justifyContent: "center", flexGrow: 1}}/>
      </SafeAreaView>
    )
  }

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
        <View style={style.container}>
          <IconButton icon={left} disabled={currentPlant == 0} onPress={previousPlant} style={{
            ...style.arrow, 
            display: currentPlant > 0 ? "flex" : "none",
            position: 'absolute',
            left: "3%",
            top: "20%",
            zIndex: 3,
          }} />
          <IconButton icon={right} disabled={currentPlant == plants.length-1} onPress={nextPlant} style={{
              ...style.arrow, 
              display: currentPlant < plants.length-1 ? "flex" : "none",
              position: 'absolute',
              right: "3%",
              top: "20%",
              zIndex: 3,
          }} />
          <Carousel
            scrollEnabled={false}
            ref={carouselRef}
            data={plants}
            renderItem={({item}) => <View style={{marginTop: 50}}>
              <HomeContent key={item.id} plant={item} redirectToCreateLog={redirectToCreateLog}/>
            </View>}
            sliderWidth={400}
            itemWidth={400}
          />
        </View>
      </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    alignContent: "center",
    backgroundColor: BACKGROUND_COLOR
  },
  carrousel: {
    justifyContent: "center",
    alignContent: "center",
  },
  title: {
    fontSize: 45,
    fontFamily: "IBMPlexMono_Italic",
    textAlign: 'center',
    color: '#4F4C4F',
    padding: 20
  },
  measurement: {
    fontSize: 17,
    fontFamily: "Roboto",
    textAlign: 'center',
    color: '#4F4C4F',
    padding: 2
  },
  time: {
    fontSize: 12,
    fontFamily: "Roboto",
    textAlign: 'center',
    color: '#4F4C4F',
    paddingTop: 10
  },
  measurements: {
    flex: 0.96,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  noMeasurements: {
    flex: 0.96,
    height: 104,
    paddingTop: 22
  },
  box: {
    backgroundColor: '#E8DECF',
    borderRadius: 8,
    padding: 20,
    marginTop: 50,
    height: 190,
    width: 240
  },
  boxElements: {
    display: "flex",
    flexDirection: "row",
  },
  description: {
    display: "flex",
    flexDirection: "row",
  },
  image: {
    width: 300,
    height: 300
  },
  arrow: {
    marginTop: 200,
    width: 25,
    height: 25
  },
  imageDescription: {
    alignSelf: "auto",
    borderRadius: 10,
    width: 130,
    height: 130,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
})

export default HomeScreen
