import { useEffect, useState } from "react"
import { CreatePostData, PostData } from "../types";
import { BASE_URL } from "../consts";

export const usePosts = () => {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
    
    useEffect(() => {
      fetchPosts();
    }, [])
    
    const createNewPost = async (post: CreatePostData) => {
      const response = await fetch(BASE_URL + '/api/posts', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      });
      const newPost = await response.json();
      setPosts(prev => [newPost, ...prev ]);
    }

    const createOrEditPost = async (post: CreatePostData) => {
      if (post.id === 0) {
        createNewPost(post);
      } else {
        // edit existing post
      }
    }

    return {
        posts,
        createOrEditPost
    }
}