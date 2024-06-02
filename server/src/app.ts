import express from "express";
import cors from "cors";

import userRoutes from './routes/user.routes';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);

export default app;
