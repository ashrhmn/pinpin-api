import { Router } from "express";
import {
  deletePinData,
  getAllPinDataRaw,
  getAllPinData,
  getPinDataById,
  saveNewPinData,
  updatePinData,
} from "../controller/PinDataController";
const router = Router();

router.get("/raw", getAllPinDataRaw);

router.get("/id/:id", getPinDataById);

router.post("/", saveNewPinData);

router.put("/id/:id", updatePinData);

router.delete("/id/:id", deletePinData);

router.get("/", getAllPinData);

export default router;
