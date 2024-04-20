import { useEffect, useState } from "react";
import { ReducedPost } from "../models/Post";

export function usePosts(
    fetchPostsFn: (pageNum: number) => Promise<ReducedPost[]>,
) {

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [posts, setPosts] = useState<ReducedPost[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [noMorePosts, setNoMorePosts] = useState<boolean>(false);
 
    const execFetch = async (pageNumber: number) => {
        if (noMorePosts) return;
        try {
            setIsFetching(true);
            console.log(pageNumber)
            const newPage = await fetchPostsFn(pageNumber);
            if (newPage.length === 0) {
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

    const next = () => {
        if (noMorePosts) return;
        setPageNumber(n => n+1)
        execFetch(pageNumber+1)
    };
    const restart = () => {
        setNoMorePosts(false);
        setPageNumber(1);
        execFetch(1)
    };

    return { posts, setPosts, isFetching, error, pageControl: { next, restart }, noMorePosts };
}