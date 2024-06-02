import express from "express";
import cors from "cors";

import userRoutes from './routes/user.routes';
import postRoutes from './routes/post.routes';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

export default app;
