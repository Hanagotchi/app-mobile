import { SafeAreaView, StyleSheet, View, Text, Pressable, ScrollView } from "react-native"
import useAuth from "../../hooks/useAuth";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamsList, RootStackParamsList } from "../../navigation/Navigator";
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import LoaderButton from "../../components/LoaderButton";
import { FAB, Icon } from 'react-native-paper';
import { BACKGROUND_COLOR, BROWN_DARK, GREEN } from "../../themes/globalThemes";
import ReminderDetail from "../../components/reminders/Reminder";
import ConfirmDeleteDialog from "../../components/ConfirmDeleteDialog";
import { useEffect, useState } from "react";
import { useHanagotchiApi } from "../../hooks/useHanagotchiApi";
import { useApiFetch } from "../../hooks/useApiFetch";
import { Reminder } from "../../models/Reminder";
import { DrawerContentScrollView } from "@react-navigation/drawer";

import { DrawerDescriptorMap, DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { DrawerNavigationState, ParamListBase } from '@react-navigation/native';
import {ActivityIndicator, Drawer, List} from "react-native-paper";
import useMyUser from '../../hooks/useMyUser';
import AuthorDetails from '../../components/social/posts/AuthorDetails';
import { useSession } from '../../hooks/useSession';
import { UserProfile } from '../../models/User';
import { PostAuthor } from '../../models/Post';
import NoContent from "../../components/NoContent";
import { useFocusApiFetch } from "../../hooks/useFocusApiFetch";
type RemindersScreenProps = NativeStackScreenProps<RootStackParamsList, "Reminders">;

const RemindersScreen: React.FC<RemindersScreenProps> = ({ navigation }) => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const api = useHanagotchiApi();
    const {
        isFetching: isFetchingMyReminders, 
        fetchedData: myReminders, 
        error
    } = useFocusApiFetch<Reminder[]>(() => api.getReminders(), []);


    if (error) {
        throw error
    };

    if (isFetchingMyReminders) {
        return <DrawerContentScrollView>
            <ActivityIndicator animating={true} color={BROWN_DARK} size={20} style={{justifyContent: "center", flexGrow: 1}}/>
        </DrawerContentScrollView>
    }

    if (!myReminders) return (
        <View style={{margin: 100}}>
          <NoContent/>
        </View>
    )

    function handleDeleteReminder(): void {
        throw new Error("Function not implemented.");
    }

    return <SafeAreaView style={style.container}>
                     {isDialogOpen && <ConfirmDeleteDialog onPress={handleDeleteReminder}/>}

        <ScrollView style={style.form} contentContainerStyle={style.content}>
            {myReminders.map((reminder, index) => (
                <View key={index} style={[style.reminderBox, index !== myReminders.length - 1 && style.boxMargin]}>

                    <ReminderDetail
                        id={reminder.id}
                        date_time={reminder.date_time}
                        content={reminder.content}
                        redirectToEditReminder={() =>  navigation.navigate("EditReminder", {reminder: reminder})}
                        openDialog={() => {
                            console.log('open dialog')
                            setIsDialogOpen(true)
                            console.log(isDialogOpen)
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