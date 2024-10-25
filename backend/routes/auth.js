const express = require("express");
const router = express.Router();

const {signUp,login} = require("../Controller/Auth");

router.post("/api/v1/signup",signUp);
router.post("/api/v1/login",login);

export default router;