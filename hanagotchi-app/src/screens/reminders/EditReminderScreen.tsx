import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { BROWN_DARK, theme } from "../../themes/globalThemes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { MainTabParamsList, RootStackParamsList } from "../../navigation/Navigator";
import EditReminder from "../../components/reminders/EditReminder";
import { useHanagotchiApi } from "../../hooks/useHanagotchiApi";
import { ReminderData } from "../../models/Reminder";


type EditReminderScreenProps = NativeStackScreenProps<RootStackParamsList, "EditReminder">

const EditReminderScreen: React.FC<EditReminderScreenProps> = ({ navigation, route }) => {
    const api = useHanagotchiApi();
    const { reminder } = route.params;

    const initData: ReminderData = {
        content: reminder.content,
        date_time: reminder.date_time,
    }

    const submit = async (data: ReminderData) => {
        await api.editReminder(reminder.id, data.date_time, data.content);
        navigation.goBack();
    }

    return (
        <SafeAreaView style={style.safeArea}>
            <View style={style.editContainer}>
                <EditReminder
                    initValues={initData} 
                    onSubmit={submit} 
                    buttonLabel="Actualizar"
                />
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
    editContainer: {
        flex: 0,
        justifyContent: 'flex-start',
        paddingTop: 30,
        alignItems: "center",
        gap: 20,
    },
    safeArea: {
        flexGrow: 1,
        backgroundColor: theme.colors.background,

    },
    activityIndicator: {
        justifyContent: "center",
        flexGrow: 1,
    },
    scrollViewContent: {
        paddingBottom: 20
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
    title: {
        fontSize: 25,
        fontFamily: "IBMPlexMono_Italic",
        textAlign: 'center',
        fontWeight: "bold"
    }
})

export default EditReminderScreen;