import { Router } from "express";
import {
  currentUser,
  loginUser,
  signUpUser,
} from "../controller/AuthController";

const router = Router();

router.post("/login", loginUser);
router.post("/signup", signUpUser);
router.get("/authUser", currentUser);

export default router;
