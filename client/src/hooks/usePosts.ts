import { useEffect, useState } from "react"
import { CreatePostData, PostData } from "../types";
import { BASE_URL } from "../consts";

export const usePosts = () => {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // in case we will want to show a loading state in the UI
    const [error, setError] = useState<string | null>(null); // in case we will want to show error indication in the UI

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
      try {
        const response = await fetch(BASE_URL + '/api/posts', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(post)
        });
        const newPost = await response.json();
        setPosts(prev => [newPost, ...prev ]);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      }
    }

    const createOrEditPost = async (post: CreatePostData) => {
      if (post.id === 0) {
        createNewPost(post);
      } else {
        // edit existing post
      }
    }

    const deletePost = async (id:number) => {
      try {
        console.log({id})
        const response = await fetch(BASE_URL + '/api/posts/' + id, { 
          method: "DELETE"
        });
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const filteredPosts = posts.filter(post => post.id !==id);
        setPosts(filteredPosts);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      }
    }
    return {
        posts,
        createOrEditPost,
        deletePost
    }
}