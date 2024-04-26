import {useState} from "react";
import {GestureResponderEvent} from "react-native";
import {Button, ButtonProps} from "react-native-paper";

const LoaderButton: React.FC<ButtonProps> = (props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleOnPress = async (e: GestureResponderEvent) => {
        try {
            setIsLoading(true);
            await Promise.resolve(props.onPress?.(e));
        } catch (e) {
            setIsLoading(false);
            throw e
        } finally {
            setIsLoading(false);
        }

        
    }

    const handleOnLongPress = async (e: GestureResponderEvent) => {
        try {
            setIsLoading(true);
            await Promise.resolve(props.onLongPress?.(e));
        } catch (e) {
            setIsLoading(false);
            throw e
        } finally {
            setIsLoading(false);
        }
    }

    return <Button
                {...props}
                loading={isLoading}
                onPress={handleOnPress}
                onLongPress={handleOnLongPress}
                disabled={props.disabled || isLoading}
            >
        {props.children}
    </Button>
}

export default LoaderButton;