import { Router } from 'express';
import { getPosts, createPost, deletePost, editPost } from '../controllers/post.controller';

const router = Router();

router.get('/', getPosts);
router.post('/', createPost);
router.delete('/:id', deletePost);
router.put('/:id', editPost);

export default router;
