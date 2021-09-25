import { Router } from "express";
import {
  deletePinData,
  getAllPinDataRaw,
  getAllPinData,
  getPinDataById,
  saveNewPinData,
  updatePinData,
  toogleFavourite,
  toogleTrashed,
} from "../controller/PinDataController";
const router = Router();

router.get("/raw", getAllPinDataRaw);

router.get("/id/:id", getPinDataById);

router.post("/", saveNewPinData);

router.put("/id/:id", updatePinData);

router.put("/toogleFavourite/:id", toogleFavourite);

router.put("/toogleTrashed/:id", toogleTrashed);

router.delete("/id/:id", deletePinData);

router.get("/", getAllPinData);

export default router;
