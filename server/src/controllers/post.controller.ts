import { Request, Response } from 'express';
import { getAllPosts, createNewPost, CreatePostData, deletePostFromDb } from '../services/post.service';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
} catch (err) {
    const error  = err as Error;
      res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const postInfo = req.body as CreatePostData;
    const newPost = await createNewPost(postInfo);
    res.status(201).json(newPost);
  } catch (err) {
    const error  = err as Error;
    res.status(500).json({ message: error.message });
  }
}

export const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    await deletePostFromDb(Number(postId));
    res.status(204).send();
  } catch (err) {
    const error  = err as Error;
    res.status(500).json({ message: error.message });
  }
}