import { Plant } from "../../models/Plant"
import { useApiFetch } from "../../hooks/useApiFetch";
import { useHanagotchiApi } from "../../hooks/useHanagotchiApi";
import { PlantType } from "../../models/PlantType";
import { Deviation, DeviationEnum, Measurement } from "../../models/Measurement";
import {ActivityIndicator, Icon, Text} from "react-native-paper";
import { Modal, Pressable, Image, StyleSheet, View } from "react-native";
import plus from "../../assets/plusicon.png";
import info from "../../assets/infoicon.png";
import close from "../../assets/closeicon.png";
import openWeatherLogo from "../../assets/openweather/logo.png";
import { useEffect, useState } from "react";
import { BROWN, BROWN_DARK, RED_DARK } from "../../themes/globalThemes";
import { useOpenWeatherApi } from "../../hooks/useOpenWeatherApi";
import useMyUser from "../../hooks/useMyUser";

type PlantInfoProps = {
    plant: Plant;
}

interface InfoToShow {
    temperature?: number;
    humidity?: number;
    light?: number;
    watering?: number;
    deviations?: Deviation;
    time_stamp?: Date;
}




const PlantInfo: React.FC<PlantInfoProps> = ({plant}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [fromWeatherApi, setFromWeatherApi] = useState(false);
    const hanagotchiApi = useHanagotchiApi()
    const openWeatherApi = useOpenWeatherApi()
    const {myUser} = useMyUser();
    const [plantInfo, setPlantInfo] = useState<InfoToShow | null>(null);
    const {
        isFetching: isFetchingPlantType,
        fetchedData: plantType,
        error: plantTypeError,
    } = useApiFetch<PlantType | null>(() => hanagotchiApi.getPlantType(plant.scientific_name), null, [plant]);
    const {
        isFetching: isFetchingMeasurement,
        fetchedData: measurement,
        error: measurementError,
    } = useApiFetch<Measurement | null>(() => hanagotchiApi.getLastMeasurement(plant.id), null, [plant]);

    const navigate = async () => {
        console.log("navigate to create log");
    };

    useEffect(() => {
        const maybeFetchWeather = async () => {
            console.log(measurement)
            if (measurement) {
                setPlantInfo(measurement);    
            } else {
                try {
                    if (myUser?.location) {
                        const weatherData = await openWeatherApi.getCurrentWeather(myUser.location.lat!, myUser.location.long!)
                        const timestamp = new Date(0);
                        timestamp.setUTCSeconds(weatherData.dt);
                        setPlantInfo({
                            temperature: Math.round(weatherData.main.temp - 273.15),
                            humidity: weatherData.main.humidity,
                            time_stamp: timestamp,
                        })
                    }
                } catch (e) {
                    setPlantInfo(null)
                }
            }
        }
        maybeFetchWeather();
    }, [measurement]);

    if (plantTypeError) throw plantTypeError;
    if (measurementError) throw measurementError;

    if (isFetchingMeasurement || isFetchingPlantType) {
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
                    {plantInfo.humidity && 
                        parseParameter(`Humedad: ${plantInfo.humidity}%`, plantInfo.deviations?.humidity)
                    }
                    {plantInfo.temperature && 
                        parseParameter(`Temperatura: ${plantInfo.temperature}°C`, plantInfo.deviations?.temperature)
                    }
                    {plantInfo.light && 
                        parseParameter(`Luz: ${plantInfo.light} ftc.`, plantInfo.deviations?.light)
                    }
                    {plantInfo.watering && 
                        parseParameter(`Riego: ${plantInfo.watering}%`, plantInfo.deviations?.watering)
                    }
                </View> :
                <View style={style.noMeasurements}>
                    <Text style={{...style.measurement, color: BROWN}}> No se registran {'\n'} mediciones</Text>
                </View>
                }
                <View style={{ gap: 20, justifyContent: "center" }}>
                    <Pressable onPress={navigate}>
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
                    <Text style={style.time}>{plantInfo.time_stamp?.toLocaleString()}</Text>
                </View>
            }
                {!measurement && <Image source={openWeatherLogo} style={{
                position: "absolute",
                top: 10,
                right: 10,
                height: 22,
                width: 51,
            }}/>}
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
    }
  })

export default PlantInfo;