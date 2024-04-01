import { BROWN_LIGHT } from "../themes/globalThemes";
import BackgroundCard from "./BackgroundCard";
import { StyleSheet } from 'react-native';
import LoaderButton from "./LoaderButton";
import ProfilePicture from "./ProfilePicture";

type EditProfilePictureProps = {
    title: string;
    profilePicture: string;
    onPressUploadPhoto: (() => void) & Function;
}
const EditProfilePicture: React.FC<EditProfilePictureProps> = ({ title, profilePicture, onPressUploadPhoto }) => {
    return (
        <BackgroundCard title={title} style_content={styles.content}>
            <ProfilePicture uri={profilePicture} />
            <LoaderButton
                mode="contained"
                uppercase
                style={styles.upload}
                onPress={onPressUploadPhoto}
                labelStyle={{ fontSize: 15 }}
            >
                SUBIR NUEVA FOTO
            </LoaderButton>
        </BackgroundCard>
    )
};

const styles = StyleSheet.create({
    upload: {
        borderRadius: 10,
        width: "75%",
        height: 40,
        justifyContent: "center",
        backgroundColor: BROWN_LIGHT,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingTop: 5
    }
});

export default EditProfilePicture;