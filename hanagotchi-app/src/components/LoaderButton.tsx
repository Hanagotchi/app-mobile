import { useState } from "react";
import { GestureResponderEvent } from "react-native";
import { Button, ButtonProps } from "react-native-paper";

const LoaderButton: React.FC<ButtonProps> = (props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleOnPress = async (e: GestureResponderEvent) => {
        setIsLoading(true);
        await Promise.resolve(props.onPress?.(e));
        setIsLoading(false);
    }

    const handleOnLongPress = async (e: GestureResponderEvent) => {
        setIsLoading(true);
        await Promise.resolve(props.onPress?.(e));
        setIsLoading(false);
    }

    return <Button {...props} loading={isLoading} onPress={handleOnPress} onLongPress={handleOnLongPress} disabled={isLoading} >
        {props.children}
    </Button>
}

export default LoaderButton;