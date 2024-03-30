import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

type ProfilePictureProps = {
    uri: string | null;
    uploadImage?: () => void;
}
const ProfilePicture: React.FC<ProfilePictureProps> = ({ uri }) => {
    return (
        <TouchableWithoutFeedback onPress={() => console.log('...presiono:', uri)}>
            <Image source={{ uri: uri ?? 'https://cdn-icons-png.flaticon.com/128/3033/3033143.png' }} style={style.profileImage} />
        </TouchableWithoutFeedback>
    )
};

const style = StyleSheet.create({
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        paddingEnd: 10
    },
});

export default ProfilePicture;