import { StyleSheet } from 'react-native';
import LoaderButton from "./LoaderButton";
import React from "react";
import TextInput from "./TextInput";
import DateButton from "./DateButton";
import EditProfilePicture from "./EditProfilePicture";
import EditLocation from './EditLocation';
import { LocationUser } from '../models/LocationUser';

type EditUserProps = {
    name: string;
    profilePicture: string;
    onChangeName: (((text: string) => void) & Function);
    onPressCompleteEdit: ((() => void) & Function);
    onPressUploadPhoto: (() => void) & Function;
    dateOfBirth: Date;
    onChangeDateOfBirth: ((date: Date) => void) & Function;
    onRequestLocation: (() => void) & Function;
    location: LocationUser | null;
}
const EditUser: React.FC<EditUserProps> = ({ name, profilePicture, onChangeName, onPressCompleteEdit, onPressUploadPhoto, dateOfBirth, onChangeDateOfBirth, onRequestLocation, location }) => {
    return (
        <>
            <TextInput label={`NOMBRE`} value={name} onChangeText={(name) => onChangeName(name)} />
            <EditProfilePicture title="FOTO DE PERFIL (Opcional)" profilePicture={profilePicture} onPressUploadPhoto={onPressUploadPhoto} />
            <DateButton title="FECHA DE NACIMIENTO" date={dateOfBirth} setDate={onChangeDateOfBirth} />
            <EditLocation title="MI UBICACIÓN" location={location} onRequestLocation={onRequestLocation} />
            <LoaderButton
                mode="contained"
                uppercase style={styles.button}
                onPress={onPressCompleteEdit}
                labelStyle={{ fontSize: 17 }}
            >
                COMPLETAR
            </LoaderButton>
        </>
    )
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        width: "50%",
        height: 50,
        alignItems: 'center',
        justifyContent: "center",
        alignSelf: "center",
    }
});

export default EditUser;