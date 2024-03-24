import { useState } from "react";
import { View, StyleSheet, SafeAreaView, ImageBackground } from "react-native";
import { Button, Text, useTheme } from 'react-native-paper';
import loginBackground from "../assets/loginBackground.png";
import { BROWN_LIGHT } from "../themes/globalThemes";


const LoginScreen: React.FC = () => {
    const [count, setCount] = useState<number>(1);
    const theme = useTheme();
    

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
            <View style={style.container}>
                <View>
                    <Text style={{...style.title, color: theme.colors.onSecondary}}>HANAGOTCHI</Text>
                    <Text style={{...style.subtitle, color: BROWN_LIGHT}}>Tu nuevo mejor amigo</Text>
                </View>
                <ImageBackground source={loginBackground} style={style.background} />
                <Button mode="contained" uppercase style={style.button} onPress={() => console.log("Press!!")}>
                    Iniciar sesion
                </Button>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        gap: 40,
        marginTop: 35,
      },
    background: {
        width: 400,
        height: 400,
    },
    header: {
        position: "absolute",
        top: 100,
        width: "100%",
        alignItems: "center",
    },
    footer: {
        position: "absolute",
        bottom: 50,
        width: "100%",
        alignItems: "center",
    },
    title: {
      fontSize: 45,
      fontFamily: "IBMPlexMono_Italic",
      textAlign: 'center',
      fontWeight: "bold"
    },
    subtitle: {
        fontSize: 30,
        fontFamily: "IBMPlexMono_Italic",
        textAlign: 'center',
        fontStyle: "italic",
      },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 3,
      borderRadius: 10,
      width: "50%",
    },
  })
  
export default LoginScreen;