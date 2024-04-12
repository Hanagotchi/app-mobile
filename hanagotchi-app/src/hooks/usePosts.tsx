import { useEffect, useState } from "react";
import { Post } from "../models/Post";

export function usePosts(
    fetchPostsFn: (pageNum: number) => Promise<Post[]>,
) {

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(false);
 
    useEffect(() => {
        const execFetch = async () => {
            try {
                setIsFetching(true);
                const newPage = await fetchPostsFn(pageNumber);
                setPosts((oldPosts) => oldPosts.concat(newPage));
            } catch (e) {
                setError(e as Error);
            } finally {
                setIsFetching(false);
            }
        }

        execFetch();
    }, [pageNumber]);

    const next = () => setPageNumber(n => n+1);
    const prev = () => setPageNumber(n => n-1);
    const reset = () => setPageNumber(1);

    return { posts, isFetching, error, pageControl: { next, prev, reset } };
}