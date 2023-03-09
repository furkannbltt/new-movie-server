import express from "express";
import {
  createUser, loginUser, sendEmail
} from "../controllers/user";

const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", loginUser);
router.post("/send-email", sendEmail)




export default router;
