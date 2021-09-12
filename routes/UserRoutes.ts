import { Router } from "express";
import { getAllUser, saveNewUser } from "../controller/UserController";

const router = Router();

router.get("/", getAllUser);

router.post("/", saveNewUser);

export default router;
