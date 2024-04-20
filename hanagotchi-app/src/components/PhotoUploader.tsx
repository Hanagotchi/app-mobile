import {FlatList, StyleSheet, View} from "react-native"
import * as ImagePicker from 'expo-image-picker';
import {FAB, Text} from "react-native-paper";
import {BEIGE_LIGHT, BROWN, BROWN_LIGHT, GREEN_DARK} from "../themes/globalThemes";
import DeletableImage from "./DeletableImage";
import {useState} from "react";

type PhotoUploaderProps = {
    maxAmount?: number;
    photosFilepathList: string[];
    updatePhotosFilepathList: (photos: string[]) => void;
    imageSize?: {
        width: number,
        height: number,
    }
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({maxAmount, photosFilepathList, updatePhotosFilepathList, imageSize}) => {
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const handleUploadPhoto = async () => {
        setIsUploading(true);
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('¡Se requiere permiso para acceder a la galería de imágenes!');
            setIsUploading(false);
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 4],
            quality: 1,
            allowsMultipleSelection: true,
            selectionLimit: maxAmount ? maxAmount - photosFilepathList.length : 0,
        });
        if (!result.canceled) {
            updatePhotosFilepathList(photosFilepathList.concat(result.assets.map(asset => asset.uri)))
        }

        setIsUploading(false);
    };

    const handleDeletePhoto = async (indexToDelete: number) => {
        photosFilepathList.splice(indexToDelete, 1);
        updatePhotosFilepathList(photosFilepathList);
    }

    return (
        <>
            <View style={{width: "80%"}}>
                <Text style={style.subtitle}>Fotos{maxAmount ? ` ${photosFilepathList.length}/${maxAmount}` : ""}</Text>
            </View>
            <FlatList 
                data={photosFilepathList}
                renderItem={
                    ({item, index}) => 
                        <DeletableImage 
                            source={{uri: item}} 
                            style={{
                                ...style.image, 
                                width: imageSize ? imageSize.width : 100,
                                height: imageSize ? imageSize.height : 100,
                            }} 
                            onPressDelete={() => handleDeletePhoto(index)}
                        />
                }
                horizontal
                style={style.photoList}
                contentContainerStyle={style.photoListContent}
                ListFooterComponent={
                    (maxAmount && maxAmount <= photosFilepathList.length)
                    ? <View/>
                    : 
                        <FAB 
                            icon={"plus"} 
                            mode="flat"
                            style={style.fab}
                            variant="primary"
                            size="medium" 
                            onPress={handleUploadPhoto}
                            color={BEIGE_LIGHT}
                            loading={isUploading}
                        /> 
                }
            />
        </>

    )
}

const style = StyleSheet.create({
    subtitle: {
        textAlign: "left",
        fontSize: 24,
        fontWeight: "bold",
        color: GREEN_DARK,
    },
    photoList: {
        flexGrow: 0,
        marginHorizontal: "5%"
    },
    photoListContent: {
        alignItems: "center", 
        gap: 5,
    },
    image: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: BROWN,
    },
    fab: {
        borderRadius: 10,
        backgroundColor: BROWN_LIGHT,
        color: BEIGE_LIGHT,
        flexGrow: 0,
    }
});

export default PhotoUploader;