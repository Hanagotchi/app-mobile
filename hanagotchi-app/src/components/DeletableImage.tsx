import { Image, ImageProps, StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";
import { GREY } from "../themes/globalThemes";

const DeletableImage: React.FC<ImageProps> = (props) => {
    return (
        <View>
            <Image {...props} />
            <FAB 
                icon="cross"
                color="white"
                customSize={20} 
                style={style.fab} 
                onPress={() => console.log("holi")}
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