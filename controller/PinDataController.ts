import { Request, Response } from "express";
import { getRepository } from "typeorm";
import PinData from "../model/PinData";

export const getAllPinData = async (req: Request, res: Response) => {
  try {
    const result = await getRepository(PinData).find();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const saveNewPinData = async (req: Request, res: Response) => {
  try {
    const { id, username, name, description, secret } = req.body;
    const result = await getRepository(PinData)
      .create({ id, username, name, description, secret })
      .save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getPinData = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await getRepository(PinData).find({ id });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deletePinData = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await getRepository(PinData).delete(id);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updatePinData = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id) || null;
    const { username, name, description, secret } = req.body;

    if (id) {
      const oldData = await getRepository(PinData).findOne({ id });
      if (oldData) {
        const result = await getRepository(PinData)
          .create({
            id,
            username: username || oldData.username,
            name: name || oldData.name,
            description: description || oldData.description,
            secret: secret || oldData.secret,
          })
          .save();
        return res.json(result);
      } else {
        //data not found with that id
        return res.status(422).json({ msg: "data not found with that id" });
      }
    } else {
      //id in params error
      return res.status(422).json({ msg: "id in params error" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
