import React from 'react';
import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

export const DEFAULT_PHOTO = "https://cdn-icons-png.flaticon.com/128/3033/3033143.png";

type ProfilePictureProps = {
    uri: string;
    uploadImage?: () => void;
    size?: number,
}
const ProfilePicture: React.FC<ProfilePictureProps> = ({ uri, size = 60 }) => {
    return (
        <TouchableWithoutFeedback>
            <Image source={{ uri }} style={{
                ...style.profileImage,
                width: size,
                height: size,
                }} />
        </TouchableWithoutFeedback>
    )
};

const style = StyleSheet.create({
    profileImage: {
        borderRadius: 30
    },
});

export default React.memo(ProfilePicture);