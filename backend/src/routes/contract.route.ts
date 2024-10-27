import { Router } from "express";
import { addDoc, verifyDoc } from "../controllers/contract.controller";

const router = Router();

router.post("/contract/verify", verifyDoc)
router.post("/contract/add", addDoc)