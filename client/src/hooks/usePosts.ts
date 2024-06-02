import { useEffect, useState } from "react"
import { PostData } from "../types";
import { BASE_URL } from "../consts";



export const usePosts = () => {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
              const response = await fetch(BASE_URL + '/api/posts');
              if (!response.ok) {
                throw new Error('Failed to fetch users');
              }
              const data: PostData[] = await response.json();
              setPosts(data);
            } catch (err) {
              const error = err as Error;
              setError(error.message);
            } finally {
              setLoading(false);
            }
          };
      
          fetchPosts();
    }, [])
    
    return {
        posts
    }
}