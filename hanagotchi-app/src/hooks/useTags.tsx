import { useApiFetch } from "./useApiFetch"
import { useHanagotchiApi } from "./useHanagotchiApi"

const useTags = () => {
    const hanagotchiApi = useHanagotchiApi();
    useApiFetch(() => hanagotchiApi.)
}