import { StyleSheet } from 'react-native';
import LoaderButton from "./LoaderButton";
import React from "react";
import TextInput from "./TextInput";
import DateButton from "./DateButton";
import EditProfilePicture from "./EditProfilePicture";
import EditLocation from './EditLocation';
import SelectBox, { SelectOption } from './SelectBox';
import { Details, Region } from 'react-native-maps';
import { UserData } from '../screens/CompleteLoginScreen';
import { FIUBA_REGION } from '../contexts/LocationContext';

type EditUserProps = {
    user: UserData;
    genders: SelectOption[];
    onChangeName: (((text: string) => void) & Function);
    onPressCompleteEdit: ((() => void) & Function);
    onPressUploadPhoto: (() => void) & Function;
    onChangeDateOfBirth: ((date: Date) => void) & Function;
    onSelectGender: (val: string) => void,
    onRegionChange: ((region: Region, details: Details) => void),
}

const EditUser: React.FC<EditUserProps> = ({ user, genders, onChangeName, onPressCompleteEdit, onPressUploadPhoto, onChangeDateOfBirth, onSelectGender, onRegionChange }) => {
    return (
        <>
            <TextInput label={`NOMBRE`} value={user.name ?? ''} onChangeText={(name) => onChangeName(name)} />
            <EditProfilePicture title="FOTO DE PERFIL (Opcional)" profilePicture={user.photo ?? 'https://cdn-icons-png.flaticon.com/128/3033/3033143.png'} onPressUploadPhoto={onPressUploadPhoto} />
            <DateButton title="FECHA DE NACIMIENTO" date={user.dateOfBirth} setDate={onChangeDateOfBirth}/>
            <SelectBox
                label="GÉNERO"
                data={genders}
                setSelected={onSelectGender}
                save="key"
                defaultOption={{ key: 0, value: "---" }}
                width="30%"
            />
            <EditLocation title="MI UBICACIÓN" region={user.location} onRegionChange={onRegionChange} />
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