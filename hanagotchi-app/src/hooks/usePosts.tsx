import { useCallback, useEffect, useMemo, useState } from "react";
import { Post } from "../models/Post";

export function usePosts(
    fetchPostsFn: (pageNum: number) => Promise<Post[]>,
) {

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [noMorePosts, setNoMorePosts] = useState<boolean>(false);

    const execFetch = useCallback(async (pageNumber: number) => {
        if (noMorePosts) return;

        try {
            setIsFetching(true);
            const newPage = await fetchPostsFn(pageNumber);
            if (newPage.length === 0) {
                setNoMorePosts(true);
                return;
            }
            console.log(pageNumber);
            setPosts((oldPosts) => pageNumber === 1 ? newPage : oldPosts.concat(newPage));
        } catch (e) {
            setError(e as Error);
        } finally {
            setIsFetching(false);
        }
        
    }, [noMorePosts, setPosts, setError, setIsFetching, setNoMorePosts])
 
    useEffect(() => {
        execFetch(pageNumber);
    }, [])

    const next = async () => {
        if (noMorePosts) return;
        setPageNumber(n => n+1);
        await execFetch(pageNumber+1);
    }; 
    const restart = async () => {
        setNoMorePosts(false);
        setPageNumber(1); 
        await execFetch(1);
    };

    return { posts, setPosts, isFetching, error, pageControl: { next, restart }, noMorePosts };
}