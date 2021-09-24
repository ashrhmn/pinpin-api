import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { getUser, getUsername } from "../middleware/Authenticate";
import PinData from "../model/PinData";
import { encrypt, decrypt } from "./CryptoController";

interface IdecryptedPinData {
  id: number;
  username: string;
  name: string;
  description: string;
  secret: string | null;
  createdDate: Date;
  updatedDate: Date;
}

const decryptPinData = (enc: PinData): IdecryptedPinData => {
  return {
    id: enc.id,
    username: enc.username,
    name: enc.name,
    description: enc.description,
    secret: decrypt({ iv: enc.iv, password: enc.secret }) || null,
    createdDate: enc.createdDate,
    updatedDate: enc.updatedDate,
  };
};

export const getAllPinData = async (req: Request, res: Response) => {
  try {
    const username = getUsername(req);

    if (!username)
      return res.status(422).json({ msg: `Invalid Username, got ${username}` });

    const result = await getRepository(PinData).find({
      where: { username },
      order: { name: "ASC" },
    });
    console.log(result.length);

    const pindata: IdecryptedPinData[] = [];
    result.forEach((element) => {
      return pindata.push(decryptPinData(element));
    });

    return res.status(200).json(pindata);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getAllPinDataRaw = async (req: Request, res: Response) => {
  try {
    const username = getUsername(req);

    if (!username)
      return res.status(422).json({ msg: `Invalid Username, got ${username}` });
    const result = await getRepository(PinData).find({ username });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const saveNewPinData = async (req: Request, res: Response) => {
  try {
    const username = getUsername(req);
    if (!username) return res.status(422).json({ msg: "Invalid Username" });
    const { id, name, description, secret } = req.body;
    if (!secret)
      return res
        .status(422)
        .json({ msg: "Secret can not be empty", result: null });
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
    return res.status(201).json({ msg: "Added successfully", result });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getPinDataById = async (req: Request, res: Response) => {
  try {
    const username = getUsername(req);
    if (!username) return res.status(422).json({ msg: "Invalid Username" });
    const id = parseInt(req.params.id);
    let result = await getRepository(PinData).findOne({ id, username });
    if (!result)
      return res.status(404).json({ msg: "Not found or Not Authenticated" });

    const decryptedResult = decryptPinData(result);
    return res.status(200).json(decryptedResult);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deletePinData = async (req: Request, res: Response) => {
  try {
    const username = getUsername(req);
    if (!username) return res.status(422).json({ msg: "Invalid Username" });
    const id = parseInt(req.params.id);
    const result = await getRepository(PinData).delete({ id, username });
    if (result.affected == 0)
      return res.status(404).json({ msg: "Not found or Not Authenticated" });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updatePinData = async (req: Request, res: Response) => {
  try {
    const username = getUsername(req);
    if (!username) return res.status(422).json({ msg: "Invalid Username" });
    const id = parseInt(req.params.id) || null;
    const { name, description, secret } = req.body;

    if (!id)
      return res.status(422).json({ msg: `ID error in parameter, got ${id}` });

    const oldData = await getRepository(PinData).findOne({ id, username });
    const encryptedSecret = encrypt(secret);

    if (!oldData)
      return res
        .status(422)
        .json({ msg: "Data not found or Not Authenticated" });

    const result = await getRepository(PinData)
      .create({
        id,
        username,
        name: name,
        description: description,
        secret: encryptedSecret?.password,
        iv: encryptedSecret?.iv,
      })
      .save();
    return res.json(decryptPinData(result));
  } catch (error) {
    return res.status(500).json(error);
  }
};

// export const updatePinData2 = async (req: Request, res: Response) => {
//   try {
//     const username = getUsername(req);
//     if (!username) return res.status(422).json({ msg: "Invalid Username" });
//     const id = parseInt(req.params.id) || null;
//     const { name, description, secret } = req.body;

//     if (!id)
//       return res.status(422).json({ msg: `ID error in parameter, got ${id}` });

//     const oldData = await getRepository(PinData).findOne({ id, username });
//     const encryptedSecret = encrypt(secret);

//     if (!oldData)
//       return res
//         .status(422)
//         .json({ msg: "Data not found or Not Authenticated" });

//     const result = await getRepository(PinData)
//       .create({
//         id,
//         username,
//         name: name || oldData.name,
//         description: description || oldData.description,
//         secret: secret ? encryptedSecret?.password : oldData.secret,
//         iv: secret ? encryptedSecret?.iv : oldData.iv,
//       })
//       .save();
//     return res.json(decryptPinData(result));
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// };
