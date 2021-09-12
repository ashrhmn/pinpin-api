import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../model/User";

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await getRepository(User).find();
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};

export const saveNewUser = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;

  try {
    const result = await getRepository(User)
      .create({ username, password, role })
      .save();
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};
