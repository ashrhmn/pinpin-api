import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { getUser, getUsername } from "../middleware/Authenticate";
import PinData from "../model/PinData";
import { encrypt, decrypt } from "./CryptoController";

export const getAllPinDataForAuthUser = async (req: Request, res: Response) => {
  try {
    // const { username } = req.params;
    const username = getUsername(req)
    
    if (!username)
      return res.status(422).json({ msg: `Invalid Username, got ${username}` });

    const result = await getRepository(PinData).find({ username:username });
    console.log(result.length);

    const pindata: {
      id: number;
      name: string;
      description: string;
      secret: string;
      username: string;
      createdDate: Date;
      updatedDate: Date;
    }[] = [];
    result.forEach((element) => {
      return pindata.push({
        id: element.id,
        name: element.name,
        description: element.description,
        secret: decrypt({ password: element.secret, iv: element.iv }) || "",
        username: element.username,
        createdDate: element.createdDate,
        updatedDate: element.updatedDate,
      });
    });

    return res.status(200).json(pindata);
  } catch (error) {
    return res.status(500).json(error);
  }
};

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
    const username = getUsername(req)
    if(!username) return res.status(422).json({msg:"Invalid Username"})
    const { id, name, description, secret } = req.body;
    const encryptedSecret = encrypt(secret);
    const result = await getRepository(PinData)
      .create({
        id,
        username,
        name,
        description,
        secret: encryptedSecret?.password,
        iv: encryptedSecret?.iv,
      })
      .save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getPinDataById = async (req: Request, res: Response) => {
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
