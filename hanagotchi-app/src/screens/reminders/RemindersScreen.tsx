import { SafeAreaView, StyleSheet, View, Text, Pressable, ScrollView } from "react-native"
import useAuth from "../../hooks/useAuth";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamsList, RootStackParamsList } from "../../navigation/Navigator";
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import LoaderButton from "../../components/LoaderButton";
import { FAB, Icon } from 'react-native-paper';
import { BACKGROUND_COLOR, GREEN } from "../../themes/globalThemes";
import ReminderBox from "../../components/reminders/Reminder";


type RemindersScreenProps = CompositeScreenProps<
    BottomTabScreenProps<MainTabParamsList, "Reminders">,
    NativeStackScreenProps<RootStackParamsList>
>;

const RemindersScreen: React.FC<RemindersScreenProps> = ({ navigation }) => {

    // lista mockeada de recordatorios
    const reminders = [
        {
            datetime: "2021-10-10T10:00:00",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        },
        {
            datetime: "2021-10-10T10:00:00",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        },
        {
            datetime: "2021-10-10T10:00:00",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        },
        {
            datetime: "2021-10-10T10:00:00",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        },
        {
            datetime: "2021-10-10T10:00:00",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        },
        {
            datetime: "2021-10-10T10:00:00",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        },
        {
            datetime: "2021-10-10T10:00:00",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        },
    ]

    return <SafeAreaView style={style.container}>
        <ScrollView style={style.form} contentContainerStyle={style.content}>
            {reminders.map((reminder, index) => (
                <View key={index} style={[style.reminderBox, index !== reminders.length - 1 && style.boxMargin]}>
                    <ReminderBox
                        datetime={reminder.datetime}
                        content={reminder.content}
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
            onPress={() => { }}
        />
    </SafeAreaView>
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