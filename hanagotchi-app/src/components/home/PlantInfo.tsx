import { Plant } from "../../models/Plant"
import { useApiFetch } from "../../hooks/useApiFetch";
import { useHanagotchiApi } from "../../hooks/useHanagotchiApi";
import { PlantType } from "../../models/PlantType";
import { Deviation, DeviationEnum, Measurement } from "../../models/Measurement";
import {ActivityIndicator, FAB, Icon, Text} from "react-native-paper";
import { Modal, Pressable, Image, StyleSheet, View } from "react-native";
import plus from "../../assets/plusicon.png";
import info from "../../assets/infoicon.png";
import close from "../../assets/closeicon.png";
import openWeatherLogo from "../../assets/openweather/logo.png";
import { useEffect, useState } from "react";
import { BEIGE_LIGHT, BROWN, BROWN_DARK, BROWN_LIGHT, RED_DARK } from "../../themes/globalThemes";
import { useOpenWeatherApi } from "../../hooks/useOpenWeatherApi";
import useMyUser from "../../hooks/useMyUser";
import { useToggle } from "../../hooks/useToggle";
import { usePlantInfo } from "../../hooks/usePlantInfo";

type PlantInfoProps = {
    plant: Plant;
    redirectToCreateLog: (plantId: number) => void;
}

interface InfoToShow {
    temperature?: number;
    humidity?: number;
    light?: number;
    watering?: number;
    deviations?: Deviation;
    time_stamp?: Date;
}


const PlantInfo: React.FC<PlantInfoProps> = ({plant, redirectToCreateLog}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const hanagotchiApi = useHanagotchiApi();
    const {
        isFetching: isFetchingPlantType,
        fetchedData: plantType,
        error: plantTypeError,
    } = useApiFetch<PlantType | null>(() => hanagotchiApi.getPlantType(plant.scientific_name), null, [plant]);

    const {
      isFetching: isFetchingPlantInfo,
      plantInfo,
      error: plantInfoError,
    } = usePlantInfo(plant);

    if (plantTypeError) throw plantTypeError;
    if (plantInfoError) throw plantInfoError;

    if (isFetchingPlantType || isFetchingPlantInfo) {
        return (<View style={style.box}>
                    <ActivityIndicator
                        animating={true}
                        color={BROWN_DARK}
                        size={20}
                        style={{justifyContent: "center", flexGrow: 1}}
                    />
                </View>);
    }

    const parseParameter = (text: string, deviation?: DeviationEnum) => {
        return <Text style={{
            ...style.measurement,
            color: !deviation ? BROWN : RED_DARK
        }}>{text}</Text>
    }

    return (<>
        <View style={style.box}>
            <View style={style.boxElements}>
            {plantInfo ?
                <View style={style.measurements}>
                    {plantInfo.info.humidity && 
                        parseParameter(`Humedad: ${plantInfo.info.humidity}%`, plantInfo.info.deviations?.humidity)
                    }
                    {plantInfo.info.temperature && 
                        parseParameter(`Temperatura: ${plantInfo.info.temperature}°C`, plantInfo.info.deviations?.temperature)
                    }
                    {plantInfo.info.light && 
                        parseParameter(`Luz: ${plantInfo.info.light} ftc.`, plantInfo.info.deviations?.light)
                    }
                    {plantInfo.info.watering && 
                        parseParameter(`Riego: ${plantInfo.info.watering}%`, plantInfo.info.deviations?.watering)
                    }
                </View> :
                <View style={style.noMeasurements}>
                    <Text style={{...style.measurement, color: BROWN}}> No se registran {'\n'} mediciones</Text>
                </View>
                }
                <View style={{ gap: 20, justifyContent: "center" }}>
                    <Pressable onPress={() => redirectToCreateLog(plant.id)}>
                        <Icon size={30} source={plus} />
                    </Pressable>
                    <Pressable onPress={() => setModalOpen(true)}>
                        <Icon size={30} source={info} />
                    </Pressable>
                </View>
            </View>
            {plantInfo &&
                <View>
                    <Text style={style.time}>Última actualización:</Text>
                    <Text style={style.time}>{plantInfo.info.time_stamp?.toLocaleString()}</Text>
                </View>
            }
            {plantInfo?.origin === "OpenWeather" && 
              <Image source={openWeatherLogo} style={{
                  position: "absolute",
                  bottom: "40%",
                  left: "48%",
                  height: 22,
                  width: 51,
              }}/>
            }
        </View>
        <Modal animationType="slide" transparent={true} visible={modalOpen} onRequestClose={() => { setModalOpen(!modalOpen) }}>
            <View style={style.centeredView}>
                <View style={style.modalView}>
                    <View style={style.modalHeader}>
                        <Text style={style.modalTitle}>{plantType!.botanical_name}</Text>
                        <Pressable onPress={() => setModalOpen(false)}>
                            <Icon size={23} source={close} />
                        </Pressable>
                    </View>
                    <View style={style.description}>
                        <Text style={style.modalText}>{plantType!.description}</Text>
                        <Image source={{ uri: plantType!.photo_link }} style={style.imageDescription} />
                    </View>
                </View>
            </View>
        </Modal>
    </>

    )
}

const style = StyleSheet.create({
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
      fontStyle: "italic",
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
      justifyContent: "space-between",
      borderRadius: 8,
      padding: 20,
      marginTop: 50,
      height: 190,
      width: 240
    },
    boxElements: {
      display: "flex",
      flexDirection: "row",
      flexGrow: 1,
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
    },
    fab: {
        borderRadius: 30,
        backgroundColor: BROWN_LIGHT,
    }
  })

export default PlantInfo;