import { useEffect, useState } from "react";
import { GetSuscribedTags } from "../models/hanagotchiApi";
import { useApiFetch } from "./useApiFetch"
import { useHanagotchiApi } from "./useHanagotchiApi"

const useTags = (deps: React.DependencyList = []) => {
    const hanagotchiApi = useHanagotchiApi();
    const {isFetching, fetchedData: tagList, error} = useApiFetch<GetSuscribedTags>(() => hanagotchiApi.getSuscribedTags(), [] ,deps);
    const [tags, setTags] = useState<Set<string>>(new Set());
    
    useEffect(() => setTags(new Set(tagList)), [tagList]);
    
    const subscribe = async (newTag: string) => {
        await hanagotchiApi.subscribeToTag(newTag);
        setTags((oldSet) => {
            oldSet.add(newTag);
            return oldSet;
        })
    }

    const unsubscribe = async (tag: string) => {
        await hanagotchiApi.unsubscribeToTag(tag);
        setTags((oldSet) => {
            oldSet.delete(tag);
            return oldSet;
        })
    }

    return {
        isFetching,
        error,
        tags,
        subscribe,
        unsubscribe,
    }
}

export default useTags;