import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { getRepository } from "typeorm";
import User from "../model/User";
import jwt from "jsonwebtoken";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await getRepository(User).findOne({ username });
    if (!user) return res.json({ msg: "User not found", token: null });
    const isCorrectPassword = await bcryptjs.compare(password, user.password);
    if (!isCorrectPassword)
      return res.json({ msg: "Invalid Password", token: null });

    const token = jwt.sign(
      { username: user.username },
      process.env.SECRET || "sshhh"
    );
    return res
      .header("authToken", token)
      .json({ token, msg: "Logged In Successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const signUpUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email, name } = req.body;
    const user = await getRepository(User).findOne({ username });
    if (user) return res.json({ msg: `Username already exists` });
    const encryptedPassword = await bcryptjs.hash(password, 12);
    const result = await getRepository(User)
      .create({
        username,
        password: encryptedPassword,
        email,
        name,
      })
      .save();
    return res
      .status(201)
      .json({ msg: "Signup Successfull, Login to continue" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const currentUser = async (req: Request, res: Response) => {
  try {
    const token = req.header("authToken");
    if (!token)
      return res.json({ msg: "Not logged in", isLoggedIn: false, user: null });
    const verifiedUser = jwt.verify(token, process.env.SECRET || "sshhh");
    if (!verifiedUser)
      return res.json({ msg: "Access Denied", isLoggedIn: false, user: null });
    return res
      .status(200)
      .json({ msg: "Logged In", isLoggedIn: true, user: verifiedUser });
  } catch (error) {
    return res.status(401).json(error);
  }
};
