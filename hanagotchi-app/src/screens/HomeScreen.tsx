import * as React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image, Pressable, Modal} from 'react-native'
import {theme} from "../themes/globalThemes";
import plant from "../assets/plant.png";
import plus from "../assets/plusicon.png";
import info from "../assets/infoicon.png";
import close from "../assets/closeicon.png";
import {Icon} from "react-native-paper";
import {useHanagotchiApi} from "../hooks/useHanagotchiApi";
import {useApiFetch} from "../hooks/useApiFetch";

const HomeScreen: React.FC = () => {
  const api = useHanagotchiApi();
  const [modalOpen, setModalOpen] = React.useState(false);
  const {isFetching, fetchedData, error} = useApiFetch(
      () => api.getPlant("2"),
      {
        id: 0,
        user_id: 0,
        name: '',
        scientific_name: ''
      }
  );

  if (!isFetching && error) {
    throw error;
  }

  console.log(fetchedData)

  const navigate = async () => {
    console.log("navigate to create log")
  }

  return (
      <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
        <View style={style.container}>
            <Text style={style.title}>Plant name</Text>
            <Image source={plant} style={style.image}></Image>

            <View style={style.box}>
              <View style={style.measurements}>
                <Text style={style.measurement}>Humedad: 50%</Text>
                <Text style={style.measurement}>Temperatura: 24C</Text>
                <Text style={style.measurement}>Luz: 10</Text>
                <Text style={style.measurement}>Riego: 25</Text>
              </View>
              <View style={{justifyContent: "space-evenly"}}>
                <Pressable onPress={navigate}>
                  <Icon size={30} source={plus}/>
                </Pressable>
                <Pressable onPress={() => setModalOpen(true)}>
                  <Icon size={30} source={info}/>
                </Pressable>
              </View>
            </View>
        </View>
        <Modal animationType="slide" transparent={true} visible={modalOpen} onRequestClose={() => { setModalOpen(!modalOpen) }}>
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <View style={style.modalHeader}>
                <Text style={style.modalTitle}>Passiflora</Text>
                <Pressable onPress={() => setModalOpen(false)}>
                  <Icon size={20} source={close}/>
                </Pressable>
              </View>
              <View style={style.description}>
                <Text style={style.modalText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla.</Text>
                <Image source={plant} style={style.imageDescription}/>
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
  imageDescription: {
    alignSelf: "center",
    width: 100,
    height: 100
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    width: "75%",
    backgroundColor: "#E8DECF",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
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
    marginBottom: 15,
    textAlign: "left",
    color: '#4F4C4F',
    fontFamily: "Roboto",
    width: "60%"
  },
  modalTitle: {
    textAlign: "left",
    color: '#4F4C4F',
    fontSize: 20,
    fontFamily: "Roboto"
  }
})

export default HomeScreen
