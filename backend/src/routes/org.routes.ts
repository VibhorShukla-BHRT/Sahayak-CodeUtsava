import { Router } from "express";
import { orgnisationSignin, orgnisationSignup } from "../controllers/organisation.controller";

const router = Router();

router.post("/signup", orgnisationSignup);
router.get("/signin", orgnisationSignin);

export { router as orgRoute }