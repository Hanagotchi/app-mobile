import { StyleSheet } from 'react-native';
import LoaderButton from "./LoaderButton";
import React from "react";
import TextInput from "./TextInput";
import DateButton from "./DatePicker";
import EditProfilePicture from "./EditProfilePicture";
import EditLocation from './GoogleMaps';
import SelectBox from './SelectBox';
import { Region } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import useLocation from '../hooks/useLocation';
import { User } from '../models/User';
import { Text } from 'react-native-paper';

type EditUserProps = {
    user: Partial<User>;
    name_button: string,
    onPressCompleteEdit: ((() => void) & Function);
    setUser: React.Dispatch<React.SetStateAction<Partial<User> | undefined>>;
}

const EditUser: React.FC<EditUserProps> = ({ user, name_button, onPressCompleteEdit, setUser }) => {
    const [requeriedFieldMessage, setRequeriedFieldMessage] = React.useState<string | null>(null);
    const { changeLocation } = useLocation();

    const genders = [
        { key: "HOMBRE", value: "HOMBRE" },
        { key: "MUJER", value: "MUJER" },
        { key: "OTRO", value: "OTRO" },
    ];

    const handleBirthDay = async (date: Date) => {
        setUser({ ...user, birthdate: date } as User);
    }
    const handleName = (name: string) => {
        setUser({ ...user, name: name } as User);
    }
    const handleGender = (gender: string) => {
        setUser({ ...user, gender: gender.toString() } as User);
    }

    // New change from Google Maps or GeoLocation from Android
    const handleRegionChange = async (new_region: Region) => {
        changeLocation(new_region.latitude, new_region.longitude, new_region.latitudeDelta, new_region.longitudeDelta);
        setUser({
            ...user, location: {
                lat: new_region.latitude,
                long: new_region.longitude
            }
        } as User);
    }

    const handleUploadPhoto = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert('¡Se requiere permiso para acceder a la galería de imágenes!');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
        if (!result.canceled) {
            setUser({ ...user, photo: result.assets[0].uri } as User);
        }
    };

    const handleOnComplete = async () => {
        if (!user.name) {
            setRequeriedFieldMessage('El nombre es requerido');
        } else if (!user.birthdate) {
            setRequeriedFieldMessage('La fecha de nacimiento es requerida');
        } else if (!user.gender || user.gender == '---') {
            setRequeriedFieldMessage('El género es requerido');
        } else {
            setRequeriedFieldMessage(null);
            onPressCompleteEdit();
        }
    }

    return (
        <>
            <TextInput label={`NOMBRE (*)`} value={user.name ?? ''} onChangeText={handleName} />
            <EditProfilePicture title="FOTO DE PERFIL (OPCIONAL)" profilePicture={user.photo ?? 'https://cdn-icons-png.flaticon.com/128/3033/3033143.png'} onPressUploadPhoto={handleUploadPhoto} />
            <DateButton title="FECHA DE NACIMIENTO (*)" userDate={user.birthdate} setDate={handleBirthDay} />
            <SelectBox
                label="GÉNERO (*)"
                data={genders}
                setSelected={handleGender}
                save="key"
                defaultOption={{ key: user.gender ?? "---", value: user.gender ?? "---" }}
            />
            <EditLocation title="MI UBICACIÓN (OPCIONAL)" onRegionChange={handleRegionChange} />
            {requeriedFieldMessage ? <Text style={styles.requiredField}>{requeriedFieldMessage}</Text> : null}
            <LoaderButton
                mode="contained"
                uppercase style={styles.button}
                onPress={handleOnComplete}
                labelStyle={{ fontSize: 17 }}
            >
                {name_button}
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
    },
    requiredField: {
        color: 'red',
        textAlign: 'center'
    }
});

export default EditUser;