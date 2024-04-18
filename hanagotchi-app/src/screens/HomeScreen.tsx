import * as React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image, Pressable, Modal} from 'react-native'
import {BROWN_DARK, theme} from "../themes/globalThemes";
import plantImage from "../assets/plant.png";
import plus from "../assets/plusicon.png";
import info from "../assets/infoicon.png";
import close from "../assets/closeicon.png";
import left from "../assets/vector2.png";
import right from "../assets/vector1.png";
import {ActivityIndicator, Icon} from "react-native-paper";
import {useHanagotchiApi} from "../hooks/useHanagotchiApi";
import {useApiFetch} from "../hooks/useApiFetch";
import * as SecureStore from "expo-secure-store";
import {useEffect, useState} from "react";
import NoContent from "../components/NoContent";

interface Measurement {
  id: number;
  id_plant: number;
  temperature: number;
  humidity: number;
  light: number;
  watering: number;
  time_stamp: string;
}

const HomeScreen: React.FC = () => {
  const api = useHanagotchiApi();
  const [modalOpen, setModalOpen] = useState(false);
  const [plantType, setPlantType] = useState({
    id: 0,
    botanical_name: '',
    common_name: '',
    description: '',
    photo_link: '',
  });
  const [measurement, setMeasurement] = useState<Measurement | null>(null);
  const userId = Number(SecureStore.getItem("userId"))
  let [currentPlant, setCurrentPlant] = useState(0);

  const {isFetching, fetchedData: plants, error} = useApiFetch(
      () => api.getPlants(userId),
      [{
        id: 0,
        id_user: 0,
        name: '',
        scientific_name: '',
      }]
  );

  const fetchPlantType = async () => {
    console.log(plants)
    console.log(plants[currentPlant])
    const fetchedPlantType = await api.getPlantType(plants[currentPlant].scientific_name);
    setPlantType(fetchedPlantType);
  };

  const fetchMeasurement = async () => {
    setMeasurement(null)
    const fetched = await api.getLastMeasurement(plants[currentPlant].id);
    if (fetched) {
      setMeasurement({
        id: fetched.id,
        id_plant: fetched.id_plant,
        time_stamp: fetched.time_stamp.toTimeString(),
        humidity: fetched.humidity,
        temperature: fetched.temperature,
        light: fetched.light,
        watering: fetched.watering
      });
    }
  };

  useEffect(() => {
    console.log("entro a este use de cuando cambio current plant")
    fetchPlantType();
    fetchMeasurement();
  }, [currentPlant]);

  if (!isFetching && error) {
    throw error;
  }

  const navigate = async () => {
    console.log("navigate to create log");
  };

  function nextPlant() {
    if (currentPlant < plants.length - 1) setCurrentPlant(currentPlant + 1);
  }

  function previousPlant() {
    if (currentPlant > 0) setCurrentPlant(currentPlant - 1);
  }

  if (plants.length == 0 && !isFetching) return (
      <View style={{margin: 100}}>
        <NoContent/>
      </View>
  )

  //console.log("current: ", currentPlant)
  //console.log("plants ", plants)

  if (isFetching) {
    return <ActivityIndicator animating={true} color={BROWN_DARK} size={80} style={{justifyContent: "center", flexGrow: 1}}/>;
  }

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <View style={style.container}>
          <Text style={style.title}>{plants[currentPlant].name}</Text>
          <View style={style.carrousel}>
            {plants.length > 1 &&
                <Pressable onPress={previousPlant}>
                  <Image source={left} style={style.arrow}/>
                </Pressable>
            }
            <Image source={plantImage} style={style.image} />
            {plants.length > 1 &&
              <Pressable onPress={nextPlant}>
                <Image source={right} style={style.arrow} />
              </Pressable>
            }
          </View>

          <View style={style.box}>
            <View style={style.boxElements}>
              {measurement ?
              <View style={style.measurements}>
                <Text style={style.measurement}>Humedad: {measurement.humidity}%</Text>
                <Text style={style.measurement}>Temperatura: {measurement.temperature}°C</Text>
                <Text style={style.measurement}>Luz: {measurement.light}ftc</Text>
                <Text style={style.measurement}>Riego: {measurement.watering}</Text>
              </View> : <Text style={style.measurement}> No se registran {'\n'} mediciones</Text> }
              <View style={{ justifyContent: "space-evenly" }}>
                <Pressable onPress={navigate}>
                  <Icon size={30} source={plus} />
                </Pressable>
                <Pressable onPress={() => setModalOpen(true)}>
                  <Icon size={30} source={info} />
                </Pressable>
              </View>
            </View>
            {measurement && <Text style={style.time}>Última actualización {measurement.time_stamp}</Text>}
          </View>
        </View>
        <Modal animationType="slide" transparent={true} visible={modalOpen} onRequestClose={() => { setModalOpen(!modalOpen) }}>
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <View style={style.modalHeader}>
                <Text style={style.modalTitle}>{plantType.botanical_name}</Text>
                <Pressable onPress={() => setModalOpen(false)}>
                  <Icon size={23} source={close} />
                </Pressable>
              </View>
              <View style={style.description}>
                <Text style={style.modalText}>{plantType.description}</Text>
                <Image source={{ uri: plantType.photo_link }} style={style.imageDescription} />
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#F7EAC8"
  },
  carrousel: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
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
  modalView: {
    margin: 20,
    width: "80%",
    backgroundColor: "#E8DECF",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 5
  },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5
  },
  modalText: {
    textAlign: "justify",
    color: '#4F4C4F',
    fontFamily: "Roboto",
    width: "60%",
    paddingRight: 10
  },
  modalTitle: {
    textAlign: "left",
    color: '#4F4C4F',
    fontSize: 22,
    fontFamily: "Roboto"
  }
})

export default HomeScreen
