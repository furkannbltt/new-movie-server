import express from "express";
import { get, create } from "../controllers/remark";

const router = express.Router();

router.post("/create", create);
router.get("/", get);


export default router;
