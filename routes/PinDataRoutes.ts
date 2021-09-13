import { Router } from "express";
import {
  deletePinData,
  getAllPinData,
  getPinData,
  saveNewPinData,
  updatePinData,
} from "../controller/PinDataController";
const router = Router();

router.get("/", getAllPinData);

router.get("/:id", getPinData);

router.post("/", saveNewPinData);

router.put("/:id", updatePinData);

router.delete("/:id", deletePinData);

export default router;
