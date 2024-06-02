

import { Request, Response } from "express";

import app from './app';

const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is up!");
});

app.listen(port, () => {
  console.log(`🔋 Server is running at http://localhost:${port}`);
});
