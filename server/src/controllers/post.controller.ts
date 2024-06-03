import { Request, Response } from 'express';
import { getAllPosts, createNewPost, CreatePostData } from '../services/post.service';

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
    console.log({body: req.body})
    const newPost = await createNewPost(postInfo);
    res.status(201).json(newPost);
  } catch (err) {
    const error  = err as Error;
    res.status(500).json({ message: error.message });
  }
}
