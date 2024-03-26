import { useState } from "react";
import { GestureResponderEvent } from "react-native";
import { Button, ButtonProps } from "react-native-paper";

const LoaderButton: React.FC<ButtonProps> = (props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleOnPress = (e: GestureResponderEvent) => {
        setIsLoading(true);
        props.onPress?.(e);
        setIsLoading(false);
    }

    const handleOnLongPress = (e: GestureResponderEvent) => {
        setIsLoading(true);
        props.onLongPress?.(e);
        setIsLoading(false);
    }

    return <Button {...props} loading={isLoading} onPress={handleOnPress}>
        {props.children}
    </Button>
}

export default LoaderButton;