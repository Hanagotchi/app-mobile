import * as React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native'
import {theme} from "../themes/globalThemes";
import plant from "../assets/plant.png";
import plus from "../assets/plusicon.png";
import info from "../assets/infoicon.png";
import {Icon} from "react-native-paper";

const HomeScreen: React.FC = () => {

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
                <Icon size={30} source={plus}></Icon>
                <Icon size={30} source={info}></Icon>
              </View>
            </View>
        </View>
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
  image: {
    width: 300,
    height: 300
  }
})

export default HomeScreen
