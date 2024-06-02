import { Request, Response } from 'express';
import { getAllUsers } from '../services/users.service';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
} catch (err) {
    const error  = err as Error;
      res.status(500).json({ message: error.message });
  }
};
