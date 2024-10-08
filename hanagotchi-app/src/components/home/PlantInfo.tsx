import { Plant } from "../../models/Plant"
import { useApiFetch } from "../../hooks/useApiFetch";
import { useHanagotchiApi } from "../../hooks/useHanagotchiApi";
import { PlantType } from "../../models/PlantType";

import { DeviationEnum } from "../../models/Measurement";
import {ActivityIndicator, FAB, Icon, IconButton, Portal, Text} from "react-native-paper";

import { Pressable, Image, StyleSheet, View } from "react-native";
import plus from "../../assets/plusicon.png";
import info from "../../assets/infoicon.png";
import close from "../../assets/closeicon.png";
import openWeatherLogo from "../../assets/openweather/logo.png";
import { useEffect, useRef, useState } from "react";
import { BEIGE_DARK, BEIGE_LIGHT, BROWN, BROWN_DARK, BROWN_LIGHT, RED_DARK } from "../../themes/globalThemes";

import { usePlantInfo } from "../../hooks/usePlantInfo";
import { InfoToShow } from "../../models/InfoToShow";
import Dialog, { DialogRef } from "../Dialog";

type PlantInfoProps = {
    plant: Plant;
    redirectToCreateLog: (plantId: number) => void;
    onChange?: (infoToShow: InfoToShow | null) => void;
}

const PlantInfo: React.FC<PlantInfoProps> = ({plant, redirectToCreateLog, onChange}) => {
    const hanagotchiApi = useHanagotchiApi();
    const plantTypeDialogRef = useRef<DialogRef>(null);
    const plantInfoDialogRef = useRef<DialogRef>(null);
    const {
        isFetching: isFetchingPlantType,
        fetchedData: plantType,
        error: plantTypeError,
    } = useApiFetch<PlantType | null>(() => hanagotchiApi.getPlantType(plant.scientific_name), null, [plant]);

    const {
      isFetching: isFetchingPlantInfo,
      plantInfo,
      error: plantInfoError,
      device,
      refresh
    } = usePlantInfo(plant);

    if (plantTypeError) throw plantTypeError;
    if (plantInfoError) throw plantInfoError;

    useEffect(() => {
      if (!onChange) return;
      onChange?.(plantInfo);
    }, [plantInfo]);

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
                    {( plantInfo.info.humidity !== undefined && plantInfo.info.humidity !== null) && 
                        parseParameter(`Humedad: ${plantInfo.info.humidity}%`, plantInfo.info.deviations?.humidity)
                      }
                    {(plantInfo.info.temperature !== undefined && plantInfo.info.temperature !== null) &&
                        parseParameter(`Temperatura: ${plantInfo.info.temperature}°C`, plantInfo.info.deviations?.temperature)
                      }
                    {(plantInfo.info.light !== undefined && plantInfo.info.light !== null) &&
                        parseParameter(`Luz: ${plantInfo.info.light} ft-c`, plantInfo.info.deviations?.light)
                      }
                    {( plantInfo.info.watering !== undefined && plantInfo.info.watering !== null) &&
                        parseParameter(`Riego: ${plantInfo.info.watering}%`, plantInfo.info.deviations?.watering)
                      }
                </View> :
                <View style={style.noMeasurements}>
                    <Text style={{...style.measurement, color: BROWN}}> No se registran {'\n'} mediciones</Text>
                </View>
                }
                <View style={{ gap: 10, justifyContent: "center" }}>
                    <Pressable onPress={() => redirectToCreateLog(plant.id)}>
                    <Icon size={30} source={plus} />
                    </Pressable>
                    <Pressable onPress={() => plantInfoDialogRef.current?.showDialog()}>
                        <Icon size={30} source={info} />
                    </Pressable>
                    <FAB
                      icon="leaf"
                      style={style.fab}
                      color={BEIGE_LIGHT}
                      customSize={30}
                      mode="flat"
                      onPress={() => plantTypeDialogRef.current?.showDialog()}
                    />
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
                  width: 52,
              }}/>
            }
            <IconButton 
              icon={"restore"} 
              iconColor={BROWN_LIGHT}
              onPress={refresh}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
              }}
            />
        </View>
        <Dialog 
          ref={plantTypeDialogRef} 
          title={plantType?.botanical_name ?? ''} 
          onDismiss={() => plantTypeDialogRef.current?.hideDialog()}
        >
          <Text style={{...style.modalText}}>{plantType!.cares}</Text>
        </Dialog>
        <Dialog
          ref={plantInfoDialogRef} 
          title={plant.name ?? ''}
          onDismiss={() => plantInfoDialogRef.current?.hideDialog()}
        >
          <View style={{gap: 10}}>
              <Text style={style.modalText}>Nombre científico: {plant.scientific_name}.</Text>
              {device ? (
                <Text style={style.modalText}>ID del sensor: {device.id_device}</Text>
              ) : (
                <Text style={{...style.modalText, textAlign: "left"}}>Actualmente no existe ningún sensor asociado a {plant.name}. Los datos climáticos presentados son generales para su zona.</Text>
              )}
          </View>
        </Dialog>
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
      width: 270
    },
    boxElements: {
      display: "flex",
      flexDirection: "row",
      flexGrow: 1,
    },
    description: {
      display: "flex",
      flexDirection: "row",
      gap: 10,
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
      borderRadius: 10,
      width: 130,
      height: 130,
    },
    modalView: {
      flexDirection: "row",
    },
    modalText: {
      textAlign: "justify",
      color: '#4F4C4F',
      fontFamily: "Roboto",
      paddingRight: 10,
    },
    fab: {
      backgroundColor: BROWN_LIGHT,
      borderRadius: 30,
      height: 30,
      width: 30,
    }
  })

export default PlantInfo;