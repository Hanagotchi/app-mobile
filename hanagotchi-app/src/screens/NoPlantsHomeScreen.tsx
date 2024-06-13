import { SafeAreaView, StyleSheet, Image } from "react-native"
import { BACKGROUND_COLOR, BEIGE, BEIGE_LIGHT, GREEN } from "../themes/globalThemes"
import { sources } from "../components/home/imageSources"
import {Text} from "react-native-paper"
import LoaderButton from "../components/LoaderButton"

const NoPlantsHomeScreen: React.FC = () => {
    return <SafeAreaView style={style.container}>
            <Text>¡Comienza agregando una planta!</Text>
            <Image 
                source={sources["relaxed"]}
                style={{
                    width: 250,
                    height: 311,
                    marginRight: 52,
                    zIndex: 1
                }}
            />
            <LoaderButton
                buttonColor={GREEN}
                textColor={BEIGE_LIGHT}
                style={style.button}
                labelStyle={{fontSize: 17}}
            >
                AÑADIR PLANTA
            </LoaderButton>
    </SafeAreaView>
}

const style = StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 100,
      justifyContent: 'space-between',
      alignItems: "center",
      alignContent: "center",
      borderWidth: 1,
      backgroundColor: BACKGROUND_COLOR
    },
    button: {
        borderRadius: 10,
        width: "50%",
        height: 50,
        justifyContent: "center",
    },
});

export default NoPlantsHomeScreen;