import { useState } from "react";
import { GestureResponderEvent } from "react-native";
import { Button, ButtonProps } from "react-native-paper";
import { GREEN } from "../themes/globalThemes";

const LoaderButton: React.FC<ButtonProps> = (props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleOnPress = async (e: GestureResponderEvent) => {
        setIsLoading(true);
        await props.onPress?.(e);
        setIsLoading(false);
    }

    const handleOnLongPress = async (e: GestureResponderEvent) => {
        setIsLoading(true);
        await props.onLongPress?.(e);
        setIsLoading(false);
    }

    return <Button {...props} loading={isLoading} onPress={handleOnPress} onLongPress={handleOnLongPress} disabled={isLoading} >
        {props.children}
    </Button>
}

export default LoaderButton;