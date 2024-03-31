import { StyleSheet } from 'react-native';
import LoaderButton from "./LoaderButton";
import React from "react";
import TextInput from "./TextInput";
import DateButton from "./DateButton";
import EditProfilePicture from "./EditProfilePicture";
import EditLocation from './EditLocation';
import { LocationUser } from '../models/LocationUser';
import SelectBox, { SelectOption } from './SelectBox';

type EditUserProps = {
    name: string;
    profilePicture: string;
    dateOfBirth: Date;
    location: LocationUser | null;
    genders: SelectOption[];
    onChangeName: (((text: string) => void) & Function);
    onPressCompleteEdit: ((() => void) & Function);
    onPressUploadPhoto: (() => void) & Function;
    onChangeDateOfBirth: ((date: Date) => void) & Function;
    onRequestLocation: (() => void) & Function;
    onSelectGender: (val: any) => void,
}

const EditUser: React.FC<EditUserProps> = ({ name, profilePicture, onChangeName, onPressCompleteEdit, onPressUploadPhoto, dateOfBirth, onChangeDateOfBirth, onRequestLocation, location, genders, onSelectGender}) => {
    return (
        <>
            <TextInput label={`NOMBRE`} value={name} onChangeText={(name) => onChangeName(name)} />
            <EditProfilePicture title="FOTO DE PERFIL (Opcional)" profilePicture={profilePicture} onPressUploadPhoto={onPressUploadPhoto} />
            <DateButton title="FECHA DE NACIMIENTO" date={dateOfBirth} setDate={onChangeDateOfBirth} />
            <SelectBox
                label="GÉNERO" 
                data={genders} 
                setSelected={onSelectGender} 
                save="key" 
                defaultOption={{key: 0, value: "---"}}
                width="30%"
            />
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