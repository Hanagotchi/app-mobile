import { useState } from "react";
import { View, StyleSheet, SafeAreaView, ImageBackground } from "react-native";
import { Button, Text, useTheme } from 'react-native-paper';
import loginBackground from "../assets/loginBackground.png";
import { BROWN_LIGHT } from "../themes/globalThemes";


const LoginScreen: React.FC = () => {
    const [count, setCount] = useState<number>(1);
    const theme = useTheme();
    

    return (
        <SafeAreaView style={{...style.container, backgroundColor: theme.colors.background}}>
            <View>
                <Text style={{...style.title, color: theme.colors.onSecondary}}>HANAGOTCHI</Text>
                <Text style={{...style.subtitle, color: BROWN_LIGHT}}>Tu nuevo mejor amigo</Text>
            </View>
            <ImageBackground source={loginBackground} style={{ width: 400, height: 400 }} />
            <Button mode="contained" uppercase style={style.button}>
                Iniciar sesion
            </Button>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: "center",
      gap: 20,
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
    description: {
      fontSize: 20,
      fontFamily: "Roboto",
      textAlign: 'center',
      color: '#4F4C4F',
      padding: 20,
      width: "75%"
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 3,
      borderRadius: 10,
      width: "50%",
      marginTop: 25,
    },
  })
  
export default LoginScreen;