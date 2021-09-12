import { Router } from "express";
import { getAllUser, saveNewUser } from "../controller/UaerController";

const router = Router();

router.get("/", getAllUser);

router.post("/", saveNewUser);

export default router;
