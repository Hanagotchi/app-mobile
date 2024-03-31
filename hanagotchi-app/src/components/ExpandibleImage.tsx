import { useCallback, useState } from "react";
import { ImageSourcePropType, Image, StyleSheet, Touchable, TouchableOpacity, ImageStyle, StyleProp, View, TouchableHighlight } from "react-native"
import { Modal, Portal } from "react-native-paper";

type ExpandibleImageProps = {
    source: ImageSourcePropType;
    minimizedImageStyle?: StyleProp<ImageStyle>;
    maximizedImageStyle?: StyleProp<ImageStyle>;
};

const ExpandibleImage: React.FC<ExpandibleImageProps> = ({source, minimizedImageStyle, maximizedImageStyle}) => {
    const [open, setOpen] = useState<boolean>(false)
    const toggleOpen = useCallback(() => setOpen((prev) => !prev), [setOpen])
    
     return (
        <>
            <Portal>
                <Modal visible={open} onDismiss={toggleOpen} style={style.modal} >
                    <Image source={source} style={maximizedImageStyle} resizeMode="contain"/>   
                </Modal>
            </Portal>
            <TouchableOpacity onPress={toggleOpen}>
                <Image source={source} style={minimizedImageStyle} />
            </TouchableOpacity>
            
        </>
    ) 
    
};

const style = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: "center",
        borderRadius: 12,
    }
});

export default ExpandibleImage;