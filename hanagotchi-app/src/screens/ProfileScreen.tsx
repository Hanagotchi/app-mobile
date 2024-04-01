import {Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {Icon, useTheme} from 'react-native-paper';
import {BEIGE, BROWN_LIGHT} from "../themes/globalThemes";
import {RootStackParamsList} from "../navigation/Navigator";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import React, {useEffect, useState} from "react";
import back from "../assets/backicon.png";
import TextInput from "../components/TextInput";
import LoaderButton from "../components/LoaderButton";

type LoginScreenProps = NativeStackScreenProps<RootStackParamsList, "Profile">

const ProfileScreen: React.FC<LoginScreenProps> = ({navigation}) => {

    const theme = useTheme();
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [date, setDate] = useState("");
    const [lenght, setLenght] = useState(0);
    const MAX_LENGHT = 500;

    useEffect(() => {
        const setInitialState = navigation.addListener('focus', () => {
            setName("");
            setText("");
            setLenght(0);
        });

        return setInitialState;
      }, [navigation]);

    useEffect(() => {
        setLenght(text.length)
    }, [text])

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
            <View style={style.container}>
                <View style={style.header}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Icon size={24} source={back}/>
                    </Pressable>
                    <Text style={style.title}>Editar perfil</Text>
                </View>

                <TextInput label={`NOMBRE`} value={name} onChangeText={(name) => setName(name)}/>
                <TextInput
                    label={`DESCRIPCIÓN    ${lenght}/${MAX_LENGHT}`}
                    value={text}
                    onChangeText={(text) => setText(text)}
                    numberOfLines={4}
                    maxLenght={500}
                />
                <TextInput label={"FECHA DE NACIMIENTO"} value={date} onChangeText={(date) => setDate(date)}/>

                <LoaderButton mode="contained" uppercase style={style.button} onPress={()=> console.log("actualizar")} labelStyle={{ fontSize: 17 }}>
                    Actualizar
                </LoaderButton>
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
      },
    background: {
        width: 400,
        height: 400,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        paddingHorizontal: 20,
        width: '100%',
        gap: 10
    },
    footer: {
        position: "absolute",
        bottom: 50,
        width: "100%",
        alignItems: "center",
    },
    title: {
      fontSize: 30,
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
        borderRadius: 10,
        width: "50%",
        height: 50,
        justifyContent: "center",
    },
    card: {
    backgroundColor: BEIGE,
        width: "80%",
        gap: 0,
        columnGap: 0,
    },
    cardTitle: {
        color: BROWN_LIGHT,
            fontSize: 12,
    }
  })
  
export default ProfileScreen;