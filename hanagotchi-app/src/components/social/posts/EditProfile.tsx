import { StyleSheet } from 'react-native';
import LoaderButton from "../../LoaderButton";
import React, { useState } from "react";
import TextInput from "../../TextInput";
import { UserProfile } from '../../../models/User';
import { Text } from 'react-native-paper';

type EditProfile = {
    initValues: UserProfile;
    onSubmit: ((data: UserProfile) => Promise<void>);
    onSubmiteComplete: (() => void);
}

const EditProfile: React.FC<EditProfile> = ({ initValues, onSubmit, onSubmiteComplete }) => {
    const [fieldInvalidMessage, setFieldInvalidMessage] = React.useState<string | null>(null);

    const [data, setData] = useState<UserProfile>(initValues);

    const onChangeNickname = (nickname: string) => setData((oldValues) => ({...oldValues, nickname}));
    const onChangeBiography = (biography: string) => setData((oldValues) => ({...oldValues, biography}));

    const handleOnComplete = async () => {
        if (!data.nickname) {
            setFieldInvalidMessage('El usuario es requerido');
        }else if (!/^[a-zA-Z0-9_-]*$/.test(data.nickname)) {
            setFieldInvalidMessage('El usuario solo puede contener letras, números, guiones bajos y medios');
        } else {
            setFieldInvalidMessage(null);
            try {
                await onSubmit(data);
                onSubmiteComplete();
            }catch (e: any) {
                if (e.response?.data?.detail?.error.includes('duplicate key value')) {
                    setFieldInvalidMessage('El usuario ya existe')
                }else{
                    throw e;
                }
            }

        }
    }

    return (
        <>
            <TextInput label={`USUARIO (*)`} value={data.nickname ?? ''} onChangeText={onChangeNickname} />
            <TextInput label={`BIOGRAFÍA`} value={data.biography ?? ''} onChangeText={onChangeBiography} />
            {fieldInvalidMessage ? <Text style={styles.requiredField}>{fieldInvalidMessage}</Text> : null}
            <LoaderButton
                mode="contained"
                uppercase style={styles.button}
                onPress={handleOnComplete}
                labelStyle={{ fontSize: 17 }}
            >
                GUARDAR
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

export default EditProfile;