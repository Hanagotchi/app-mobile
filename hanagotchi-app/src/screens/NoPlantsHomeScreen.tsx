import { SafeAreaView, StyleSheet, Image, ImageBackground } from "react-native"
import { BACKGROUND_COLOR, BEIGE, BEIGE_LIGHT, GREEN } from "../themes/globalThemes"
import { sources } from "../components/home/imageSources"
import {Text} from "react-native-paper"
import LoaderButton from "../components/LoaderButton"
import background from "../assets/hanagotchis/background_1.png"

type NoPlantsHomeScreenProps = {
    redirectToAddPlantScreen:  () => void;
}

const NoPlantsHomeScreen: React.FC<NoPlantsHomeScreenProps> = ({redirectToAddPlantScreen}) => {
    return (
        <SafeAreaView style={style.container}>  
            {/* <Image 
                source={background}
                style={{
                    width: 350,
                    height: 450,
                    position: "absolute",
                    top: "35%",
                    left: "0%", 
                }}
            /> */}
            <Text style={style.title}>¡Comienza agregando un Hanagotchi!</Text>
            <Image 
                source={sources["relaxed"]}
                style={{
                    width: 250,
                    height: 311,
                    marginRight: 52,
                }}
            />
            <LoaderButton
                buttonColor={GREEN}
                textColor={BEIGE_LIGHT}
                style={style.button}
                labelStyle={{fontSize: 15}}
                onPress={redirectToAddPlantScreen}
            >
                AÑADIR HANAGOTCHI
            </LoaderButton>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 90,
      justifyContent: 'space-between',
      alignItems: "center",
      alignContent: "center",
      backgroundColor: BACKGROUND_COLOR
    },
    button: {
        borderRadius: 10,
        width: "50%",
        height: 50,
        justifyContent: "center",
    },
    title: {
        fontSize: 40,
        fontFamily: "IBMPlexMono_Italic",
        textAlign: 'center',
        color: '#4F4C4F',
        padding: 20,
    }
});

export default NoPlantsHomeScreen;