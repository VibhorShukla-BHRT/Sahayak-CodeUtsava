import { Router } from "express";
import { userSignin, userSignup } from "../controllers/user.controller";

const router = Router();

router.post("/signup", userSignup);
router.post("/signin", userSignin);

export { router as userRouter }