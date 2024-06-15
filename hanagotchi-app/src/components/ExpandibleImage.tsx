import { useCallback, useState } from "react";
import { ImageSourcePropType, Image, StyleSheet, TouchableOpacity, ImageStyle, StyleProp, View, TouchableWithoutFeedback } from "react-native"
import { ActivityIndicator, Modal, Portal } from "react-native-paper";

type ExpandibleImageProps = {
    source: ImageSourcePropType;
    minimizedImageStyle?: StyleProp<ImageStyle>;
    maximizedImageStyle?: StyleProp<ImageStyle>;
};

const ExpandibleImage: React.FC<ExpandibleImageProps> = ({source, minimizedImageStyle, maximizedImageStyle}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const toggleOpen = useCallback(() => setOpen((prev) => !prev), [setOpen]);
    
     return (
        <View style={style.container}>
            <Portal>
                <Modal visible={open} onDismiss={toggleOpen} style={style.modal} >
                    <Image source={source} style={maximizedImageStyle} resizeMode="contain"/>   
                </Modal>
            </Portal>
            <TouchableOpacity onPress={toggleOpen} disabled={loading}>
                <Image
                    source={source} 
                    style={minimizedImageStyle}
                    resizeMode="cover"
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                />
            </TouchableOpacity>
            {loading && <ActivityIndicator color="green" size="large" style={style.loader}/>}
        </View>
    ) 
    
};

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    modal: {
        flex: 1,
        alignItems: "center",
        borderRadius: 12,
    },
    loader: {
        position: "absolute",
        bottom: "40%",
        left: "42%"
    }
});

export default ExpandibleImage;