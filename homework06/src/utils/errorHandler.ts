import { Response } from "express";

export const handleError = (err: Error, res: Response) => {
  if (err.message === "Not found") {
    return res.status(404).json({ error: err.message });
  }
  res.status(500).json({ error: err.message });
};
