import { SafeAreaView, StyleSheet, View, ScrollView } from "react-native"
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from "../../navigation/Navigator";
import { FAB } from 'react-native-paper';
import { BACKGROUND_COLOR, BROWN_DARK, GREEN } from "../../themes/globalThemes";
import ReminderPreview from "../../components/reminders/ReminderPreview";
import { useState, useRef } from "react";
import { useHanagotchiApi } from "../../hooks/useHanagotchiApi";
import { Reminder } from "../../models/Reminder";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { ActivityIndicator } from "react-native-paper";
import NoContent from "../../components/NoContent";
import { useFocusApiFetch } from "../../hooks/useFocusApiFetch";
import Dialog, { DialogRef } from "../../components/Dialog";
type RemindersScreenProps = NativeStackScreenProps<RootStackParamsList, "Reminders">;

const RemindersScreen: React.FC<RemindersScreenProps> = ({ navigation }) => {
    const ref = useRef<DialogRef>(null);
    const api = useHanagotchiApi();
    const [focus, setFocus] = useState<boolean>(false);
    const {
        isFetching: isFetchingMyReminders,
        fetchedData: myReminders,
        error
    } = useFocusApiFetch<Reminder[]>(() => api.getReminders(), [], [focus]);


    if (error) {
        throw error
    };

    if (isFetchingMyReminders) {
        return <DrawerContentScrollView>
            <ActivityIndicator animating={true} color={BROWN_DARK} size={20} style={{ justifyContent: "center", flexGrow: 1 }} />
        </DrawerContentScrollView>
    }

    if (!myReminders) return (
        <View style={{ margin: 100 }}>
            <NoContent />
        </View>
    )

    return (
        <>

            <SafeAreaView style={style.container}>
                <ScrollView style={style.form} contentContainerStyle={style.content}>
                    {myReminders.map((reminder, index) => (
                        <View key={index} style={[style.reminderBox, index !== myReminders.length - 1 && style.boxMargin]}>

                            <ReminderPreview
                                id={reminder.id}
                                date_time={reminder.date_time}
                                content={reminder.content}
                                redirectToEditReminder={() => navigation.navigate("EditReminder", { reminder: reminder })}
                                refreshScreenAfterDelete={() => {
                                    setFocus(!focus);
                                  ;
                                }}
                            />
                        </View>
                    ))}
                </ScrollView>
                <FAB
                    icon={"plus"}
                    mode="flat"
                    style={style.fab}
                    variant="primary"
                    size="medium"
                    color={BACKGROUND_COLOR}
                    onPress={() => navigation.navigate("CreateReminder")}
                />
            </SafeAreaView>
        </>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 40,
        backgroundColor: BACKGROUND_COLOR,
    },
    reminderBox: {
        marginBottom: 20,
    },
    boxMargin: {
        marginBottom: 20,
    },
    fab: {
        bottom: "8%",
        left: "42%",
        position: 'absolute',
        backgroundColor: GREEN,
        color: BACKGROUND_COLOR,
        borderRadius: 30,
    },
    form: {
        flex: 1,
        flexGrow: 1,
        width: "100%",
    },
    content: {
        justifyContent: 'flex-start',
        alignItems: "center",
        gap: 10,
        width: "100%",
    },
})

export default RemindersScreen;