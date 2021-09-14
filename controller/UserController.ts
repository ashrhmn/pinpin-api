import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../model/User";

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await getRepository(User).find();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const saveNewUser = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;
    const result = await getRepository(User)
      .create({ username, password, role })
      .save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const username = req.body.username;
    if (id) {
      const result = await getRepository(User).findOneOrFail(id);
      return res.status(200).json(result);
    } else if (username) {
      const result = await getRepository(User).findOneOrFail({ username });
      return res.status(200).json(result);
    } else {
      return res.status(422).json({
        msg: `Invalid id params and or username, got username: ${username} and id: ${id}`,
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (id) {
      await getRepository(User).findOneOrFail(id)
      const result = await getRepository(User).delete(id);
      return res.status(200).json(result);
    } else {
      return res.status(422).json({ msg: `Invalid id parameter, got ${id}` });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (id) {
      const { username, password, role } = req.body;
      const ogData = await getRepository(User).findOneOrFail(id);
      const result = await getRepository(User)
        .create({
          id,
          username: username || ogData.username,
          password: password || ogData.password,
          role: role || ogData.role,
        })
        .save();
      return res.status(201).json(result);
    } else {
      return res.status(422).json({ msg: `Invalid id parameter, got ${id}` });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
