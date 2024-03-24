import { PropsWithChildren } from "react";
import { GestureResponderEvent, Pressable, StyleSheet, Text } from "react-native"
import { globalTheme } from "../themes/globalThemes";

type Props = PropsWithChildren & {
    label: string;
    color?: "primary" | "secondary" | "error";
    textColor?: "dark" | "light";
    size?: "small" | "medium" | "big";
    onPress?: ((event: GestureResponderEvent) => void) | null,
    onLongPress?: ((event: GestureResponderEvent) => void) | null,
    style?: object;
}

const Button: React.FC<Props> = ({
    label,
    color,
    textColor,
    size,
    onPress,
    onLongPress,
    style,
    children
}) => {

    let backgroundColor: string = globalTheme.pallete[color ?? "primary"].main;
    let pressedBackgroundColor: string = globalTheme.pallete[color ?? "primary"].dark;

    const commonStyle = StyleSheet.create({
        common: {
            height: globalTheme.components.button.size[size ?? "medium"],
            alignItems: "center",
            justifyContent: "center",
        },
        buttonText: {
            fontFamily: "IBMPlexMono_600SemiBold",
            color: globalTheme.components.text.color[textColor ?? "light"],
            fontWeight: "bold",
            fontSize: globalTheme.components.text.size[size ?? "medium"]
        }
    })

    const pressableStyle = StyleSheet.create({
        button: {
            ...style,
            ...commonStyle.common,
          backgroundColor: backgroundColor,
          
        },
        pressedButton: {
            ...style,
            ...commonStyle.common,
          backgroundColor: pressedBackgroundColor,
        },
    })

    return <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={({pressed}) => pressed ? pressableStyle.pressedButton : pressableStyle.button}
    >
        <Text style={commonStyle.buttonText}>{label.toLocaleUpperCase()}</Text>
    </Pressable>
}




export default Button;