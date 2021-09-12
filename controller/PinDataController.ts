import { Request, Response } from "express";
import { getRepository } from "typeorm";
import PinData from "../model/PinData";

export const getAllPinData = async (req: Request, res: Response) => {
  try {
    const result = await getRepository(PinData).find();
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};

export const saveNewPinData = async (req: Request, res: Response) => {
  try {
    const { username, name, description, secret } = req.body;
    const result = await getRepository(PinData)
      .create({ username, name, description, secret })
      .save();
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};
