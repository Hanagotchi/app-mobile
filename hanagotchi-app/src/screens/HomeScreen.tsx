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
  arrow: {
    marginTop: 200,
    width: 25,
    height: 25
  },
})

export default HomeScreen
