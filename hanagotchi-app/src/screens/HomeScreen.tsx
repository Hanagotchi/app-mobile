import * as React from 'react';
import {BACKGROUND_COLOR, BROWN_DARK} from "../themes/globalThemes";
import { useEffect, useRef, useState} from "react";
import { View, StyleSheet, SafeAreaView } from 'react-native'
import left from "../assets/vector2.png";
import right from "../assets/vector1.png";
import { ActivityIndicator, IconButton } from "react-native-paper";
import { useHanagotchiApi } from "../hooks/useHanagotchiApi";
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
import messaging from '@react-native-firebase/messaging';



type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamsList, "Home">,
  NativeStackScreenProps<RootStackParamsList>
>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const api = useHanagotchiApi();
  const userId = useSession((state) => state.session!.userId);
  const carouselRef = useRef<Carousel<Plant>>(null);

  const { isFetching, fetchedData: plants, error } = useFocusApiFetch(
    () => api.getPlants({ id_user: userId }),
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

  useEffect(() => {
    requestUserPermission();
  }, []);


  if (!isFetching && error) {
    throw error;
  }

  const nextPlant = () => carouselRef.current?.snapToNext();
  const previousPlant = () => carouselRef.current?.snapToPrev();

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      messaging().getToken().then(async token => {
        await api.patchUser({ device_token: token });
      })
    }
    return enabled
  }


  if (plants.length == 0 && !isFetching) return (
    <View style={{ margin: 100 }}>
      <NoContent />
    </View>
  )

  if (isFetching) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
        <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={{ justifyContent: "center", flexGrow: 1 }} />
      </SafeAreaView>
    )
  }

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
        <View style={style.container}>
          <IconButton icon={left} onPress={previousPlant} style={{
            ...style.arrow,
            position: 'absolute',
            left: "3%",
            top: "20%",
            zIndex: 3,
          }} />
          <IconButton icon={right} onPress={nextPlant} style={{
              ...style.arrow,
              position: 'absolute',
              right: "3%",
              top: "20%",
              zIndex: 3,
          }} />
          <Carousel
            loop
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
