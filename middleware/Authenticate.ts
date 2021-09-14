import { NextFunction, Request, Response } from "express";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";

declare module "jsonwebtoken" {
  export interface JwtPayload {
    username: string;
    role: string;
  }
}

export default async (req: Request, res: Response, next: NextFunction) => {
  // const token = req.header("authToken");
  // if (!token) return res.status(400).json({ msg: "Access Denied" });
  // try {
  //   jwt.verify(token, process.env.SECRET || "sshhh");
  //   next();
  //   return res.status(200)
  // } catch (error) {
  //   return res.status(400).json({ msg: "Acesss Denied" });
  // }

  const user = getUser(req);
  if (user.hasError) return res.status(422).json(user.result);
  next();
};

export const getUser = (
  req: Request
): {
  result: string | JwtPayload;
  hasError: boolean;
} => {
  const token = req.header("authToken");
  if (!token) return { result: "Access Denied", hasError: true };
  try {
    const user = <JwtPayload>jwt.verify(token, process.env.SECRET || "sshhh");
    return { result: user, hasError: false };
  } catch (error) {
    return { result: "500" + error, hasError: true };
  }
};

export const getUsername = (req: Request) => {
  const user = <{ result: JwtPayload; hasError: boolean }>getUser(req);
  if (user.hasError) return null;
  return user.result.username;
};

export const getUserRole = (req: Request) => {
  const user = <{ result: JwtPayload; hasError: boolean }>getUser(req);
  if (user.hasError) return null;
  return user.result.role;
};
