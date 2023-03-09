import express from "express";
import { getAll, getById } from "../controllers/films";

const router = express.Router();

router.get("/", getAll);
router.get("/detail", getById);


export default router;
