import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("authToken");
  if (!token) return res.status(400).json({ msg: "Access Denied" });
  try {
    jwt.verify(token, process.env.SECRET || "sshhh");
    next();
  } catch (error) {
    return res.status(400).json({ msg: "Acesss Denied" });
  }
};
