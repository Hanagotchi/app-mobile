import * as React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image, Pressable, Modal} from 'react-native'
import {theme} from "../themes/globalThemes";
import plantImage from "../assets/plant.png";
import plus from "../assets/plusicon.png";
import info from "../assets/infoicon.png";
import close from "../assets/closeicon.png";
import left from "../assets/vector2.png";
import right from "../assets/vector1.png";
import {Icon} from "react-native-paper";
import {useHanagotchiApi} from "../hooks/useHanagotchiApi";
import {useApiFetch} from "../hooks/useApiFetch";
import * as SecureStore from "expo-secure-store";
import {useEffect, useState} from "react";

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
  //const userId = Number(SecureStore.getItem("userId"))
  const {isFetching, fetchedData: plants, error} = useApiFetch(
      () => api.getPlants(2),
      [{
        id: 0,
        id_user: 0,
        name: '',
        scientific_name: '',
      }]
  );

  const plantss = [{"id": 1, "id_user": 2, "name": "Canna", "scientific_name": "Canna indica"}, {"id": 2, "id_user": 2, "name": "Rosa", "scientific_name": "Rosa chinensis"}, {"id": 3, "id_user": 2, "name": "yummi", "scientific_name": "Monstera deliciosa"}]
  let [currentPlant, setCurrentPlant] = useState(0);

  const fetchPlantType = async () => {
    const fetchedPlantType = await api.getPlantType(plantss[currentPlant].scientific_name);
    setPlantType(fetchedPlantType);
  };

  useEffect(() => {
    fetchPlantType();
  }, [currentPlant]);

  if (!isFetching && error) {
    throw error;
  }

  console.log("-----")
  console.log(plantss[currentPlant].name)
  console.log(plantType.botanical_name)
  console.log(plantType.photo_link)

  const navigate = async () => {
    console.log("navigate to create log");
  };

  function nextPlant() {
    if (currentPlant < plantss.length - 1) setCurrentPlant(currentPlant + 1);
  }

  function previousPlant() {
    if (currentPlant > 0) setCurrentPlant(currentPlant - 1);
  }

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <View style={style.container}>
          <Text style={style.title}>{plantss[currentPlant].name}</Text>
          <View style={style.carrousel}>
            <Pressable onPress={previousPlant}>
              <Image source={left} style={style.arrow}/>
            </Pressable>
            <Image source={plantImage} style={style.image} />
            <Pressable onPress={nextPlant}>
              <Image source={right} style={style.arrow} />
            </Pressable>
          </View>

          <View style={style.box}>
            <View style={style.measurements}>
              <Text style={style.measurement}>Humedad: 50%</Text>
              <Text style={style.measurement}>Temperatura: 24C</Text>
              <Text style={style.measurement}>Luz: 10</Text>
              <Text style={style.measurement}>Riego: 25</Text>
            </View>
            <View style={{ justifyContent: "space-evenly" }}>
              <Pressable onPress={navigate}>
                <Icon size={30} source={plus} />
              </Pressable>
              <Pressable onPress={() => setModalOpen(true)}>
                <Icon size={30} source={info} />
              </Pressable>
            </View>
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
    display: "flex",
    flexDirection: "row",
    height: 160,
    width: 240
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
