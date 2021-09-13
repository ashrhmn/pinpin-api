import { Router } from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  saveNewUser,
  updateUser,
} from "../controller/UserController";

const router = Router();

router.get("/", getAllUser);

router.get("/:id", getUser);

router.post("/", saveNewUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
