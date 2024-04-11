import { Image, ImageProps, StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";
import { GREY } from "../themes/globalThemes";

type DeletableImageProps = ImageProps & {
    onPressDelete: () => void;
}

const DeletableImage: React.FC<DeletableImageProps> = (props) => {
    return (
        <View>
            <Image {...props} />
            <FAB 
                icon="close"
                color="white"
                customSize={20} 
                style={style.fab} 
                onPress={props.onPressDelete}
            />
        </View>
        
    )
}

const style = StyleSheet.create({
    fab: {
        position: "absolute",
        top: "5%",
        right: "5%",
        borderRadius: 30,
        opacity: 0.9,
        backgroundColor: GREY,
    }
});

export default DeletableImage;