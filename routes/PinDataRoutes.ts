import { Router } from "express"
import { getAllPinData, saveNewPinData } from "../controller/PinDataController"
const router = Router()

router.get('/',getAllPinData)

router.post('/',saveNewPinData)

export default router