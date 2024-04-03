import { StyleSheet } from 'react-native';
import LoaderButton from "./LoaderButton";
import React, { useEffect } from "react";
import TextInput from "./TextInput";
import DateButton from "./DatePicker";
import EditProfilePicture from "./EditProfilePicture";
import EditLocation from './GoogleMaps';
import SelectBox from './SelectBox';
import { Details, Region } from 'react-native-maps';
import { UserData } from '../screens/CompleteLoginScreen';
import { DEFAULT_REGION } from '../contexts/LocationContext';
import * as ImagePicker from 'expo-image-picker';
import useLocation from '../hooks/useLocation';

type EditUserProps = {
    user: UserData;
    name_button: string,
    onPressCompleteEdit: ((() => void) & Function);
    setUser: React.Dispatch<React.SetStateAction<UserData | undefined>>;
}

const EditUser: React.FC<EditUserProps> = ({ user, name_button, onPressCompleteEdit, setUser }) => {
    const { location, changeLocation } = useLocation();

    // Si cambio, lo actualizo en el UserData recibido!
    useEffect(() => {
        if (location !== DEFAULT_REGION && location !== user.location) {
            setUser({ ...user, location: location });
        }
    }, [location]);

    const genders = [
        { key: 1, value: "HOMBRE" },
        { key: 2, value: "MUJER" },
        { key: 3, value: "OTRO" },
    ];

    const handleBirthDay = async (date: Date) => {
        setUser({ ...user, dateOfBirth: date } as UserData);
    }
    const handleName = (name: string) => {
        setUser({ ...user, name: name } as UserData);
    }
    const handleGender = (gender: string) => {
        setUser({ ...user, gender: gender } as UserData);
    }

    const handleRegionChange = (region: Region, details: Details) => {
        changeLocation(region.latitude, region.longitude, region.latitudeDelta, region.longitudeDelta);
    }

    const handleUploadPhoto = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
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
            setUser({ ...user, photo: result.assets[0].uri } as UserData);
        }
    };

    return (
        <>
            <TextInput label={`NOMBRE (*)`} value={user.name ?? ''} onChangeText={handleName} />
            <EditProfilePicture title="FOTO DE PERFIL (OPCIONAL)" profilePicture={user.photo ?? 'https://cdn-icons-png.flaticon.com/128/3033/3033143.png'} onPressUploadPhoto={handleUploadPhoto} />
            <DateButton title="FECHA DE NACIMIENTO (*)" date={user.dateOfBirth} setDate={handleBirthDay}/>
            <SelectBox
                label="GÉNERO (*)"
                data={genders}
                setSelected={handleGender}
                save="key"
                defaultOption={{ key: 0, value: "---" }}
                width="30%"
            />
            <EditLocation title="MI UBICACIÓN (OPCIONAL)" region={user.location} onRegionChange={handleRegionChange} />
            <LoaderButton
                mode="contained"
                uppercase style={styles.button}
                onPress={onPressCompleteEdit}
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
    }
});

export default EditUser;