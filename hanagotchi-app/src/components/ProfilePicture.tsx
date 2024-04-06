import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

export const DEFAULT_PHOTO = "https://cdn-icons-png.flaticon.com/128/3033/3033143.png";

type ProfilePictureProps = {
    uri: string;
    uploadImage?: () => void;
}
const ProfilePicture: React.FC<ProfilePictureProps> = ({ uri }) => {
    return (
        <TouchableWithoutFeedback onPress={() => console.log('...presiono:', uri)}>
            <Image source={{ uri }} style={style.profileImage} />
        </TouchableWithoutFeedback>
    )
};

const style = StyleSheet.create({
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
});

export default ProfilePicture;