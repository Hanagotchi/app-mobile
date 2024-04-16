import { AxiosError } from "axios"
import { ToastAndroid } from "react-native"
import { ZodError } from "zod";

function handleAxiosError(err: AxiosError) {
    switch (err.code) {
        case "ERR_NETWORK":
            ToastAndroid.show(`Network error: ${err.message}`, ToastAndroid.SHORT)
            break;
          case "ERR_BAD_REQUEST":
            ToastAndroid.show(`Bad request: ${err.message}`, ToastAndroid.SHORT)
            break;
          default:
            console.log(err.toJSON());
            ToastAndroid.show(`Unexpected network error: ${err.message}`, ToastAndroid.SHORT)
    }
}

function handleZodError(err: ZodError) {
    err.issues.map(issue => ToastAndroid.show(issue.message, ToastAndroid.LONG))
}


export function handleError(err: Error) {
    switch (err.constructor) {
        case AxiosError:
            handleAxiosError(err as AxiosError);
            break;
        case ZodError:
            handleZodError(err as ZodError);
            break;
        default:
            console.log(err.name, err.message)
            ToastAndroid.show(`Unexpected error: ${err.name} ${err.message}`, ToastAndroid.SHORT)
    }
}