import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { getRepository } from "typeorm";
import User from "../model/User";
import jwt from "jsonwebtoken";

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await getRepository(User).findOne({ username });
  if (!user) return res.status(400).json({ msg: "User not found" });
  const isCorrectPassword = await bcryptjs.compare(password, user.password);
  if (!isCorrectPassword)
    return res.status(400).json({ msg: "Invalid Password" });

  const token = jwt.sign(
    { username: user.username },
    process.env.SECRET || "sshhh"
  );

  return res.header("authToken", token).json({ token });
};

export const signUpUser = async (req: Request, res: Response) => {
  const { username, password, role } = req.body;
  const encryptedPassword = await bcryptjs.hash(password, 12);
  const result = await getRepository(User)
    .create({
      username,
      password: encryptedPassword,
      role,
    })
    .save();
  return res.status(201).json(result);
};

export const currentUser = async (req: Request, res: Response) => {
  const token = req.header("authToken");
  if (!token) return res.status(400).json({ msg: "Not logged in" });

  try {
    const verifiedUser = jwt.verify(token, process.env.SECRET || "sshhh");
    if (!verifiedUser) return res.status(400).json({ msg: "Access Denied" });
    return res.status(200).json(verifiedUser);
  } catch (error) {
    return res.status(400).json(error);
  }
};
