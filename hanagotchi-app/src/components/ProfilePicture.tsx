import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

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
        borderRadius: 30,
        paddingEnd: 10
    },
});

export default ProfilePicture;