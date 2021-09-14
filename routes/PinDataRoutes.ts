import { Router } from "express";
import {
  deletePinData,
  getAllPinData,
  getAllPinDataForAuthUser,
  getPinDataById,
  saveNewPinData,
  updatePinData,
} from "../controller/PinDataController";
const router = Router();

router.get("/raw", getAllPinData);

router.get("/id/:id", getPinDataById);

router.post("/", saveNewPinData);

router.put("/id/:id", updatePinData);

router.delete("/id/:id", deletePinData);

router.get("/",getAllPinDataForAuthUser)

export default router;
