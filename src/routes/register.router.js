import { Router } from "express";
import { getRegister } from "../controllers/register.controller.js";
const router = Router();

router.get("/", getRegister);
//router.post("/", postLogin);

export default router;
