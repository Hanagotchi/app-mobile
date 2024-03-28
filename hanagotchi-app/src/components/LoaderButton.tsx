import { useState } from "react";
import { GestureResponderEvent } from "react-native";
import { Button, ButtonProps } from "react-native-paper";

const LoaderButton: React.FC<ButtonProps> = (props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleOnPress = async (e: GestureResponderEvent) => {
        setIsLoading(true);
        props.onPress?.(e);
        await setIsLoading(false);
    }

    const handleOnLongPress = (e: GestureResponderEvent) => {
        setIsLoading(true);
        props.onLongPress?.(e);
        setIsLoading(false);
    }

    return <Button {...props} loading={isLoading} onPress={handleOnPress} onLongPress={handleOnLongPress}>
        {props.children}
    </Button>
}

export default LoaderButton;