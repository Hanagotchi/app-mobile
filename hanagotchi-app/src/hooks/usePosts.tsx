import { useEffect, useState } from "react";
import { ReducedPost } from "../models/Post";
import { useToggle } from "./useToggle";

export function usePosts(
    fetchPostsFn: (pageNum: number) => Promise<ReducedPost[]>,
) {

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [posts, setPosts] = useState<ReducedPost[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [noMorePosts, setNoMorePosts] = useState<boolean>(false);
 
    const execFetch = async (pageNumber: number, ignoreNoMorePosts = false) => {
        console.log(noMorePosts, pageNumber);
        if (noMorePosts && !ignoreNoMorePosts) return;
        
        try {
            setIsFetching(true);
            const newPage = await fetchPostsFn(pageNumber);
            if (newPage.length === 0 && pageNumber > 1) {
                setNoMorePosts(true);
                return;
            }
            setPosts((oldPosts) => pageNumber === 1 ? newPage : oldPosts.concat(newPage));
        } catch (e) {
            setError(e as Error);
        } finally {
            setIsFetching(false);
        }
    }

    useEffect(() => {
        execFetch(pageNumber);
    }, []);

    useEffect(() => {
        setPosts([]);
        restart();
    }, [fetchPostsFn])

    const next = async () => {
        console.log("Hola");
        if (noMorePosts) return;
        setPageNumber(n => n+1)
        await execFetch(pageNumber+1)
    };
    const restart = async () => {
        setNoMorePosts(false);
        setPageNumber(1);
        await execFetch(1, true)
    };

    return { posts, setPosts, isFetching, error, pageControl: { next, restart }, noMorePosts };
}