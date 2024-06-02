import { Request, Response } from 'express';
import { getAllPosts } from '../services/post.service';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
} catch (err) {
    const error  = err as Error;
      res.status(500).json({ message: error.message });
  }
};
