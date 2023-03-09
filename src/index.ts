import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import userRoutes from "./routes/user";
import remarkRoutes from "./routes/remark";
import filmRoutes from "./routes/films";


// schedule cron job
const scheduleFetchMovies = require("./cron/scheduleFetchMovies");
scheduleFetchMovies();

const app = express();


app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());

app.use((request: Request, response: Response, next: NextFunction) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  );

  response.setTimeout(3000);
  if (request.method === "OPTIONS") {
    response.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
    return response.status(200).json({});
  }
  next();
});

app.use("/user", userRoutes);
app.use("/remark", remarkRoutes);
app.use("/film", filmRoutes);


app.use((request: Request, response: Response, next: NextFunction) => {
  const error = new Error("not found");
  return response.status(404).json({
    message: error.message,
  });
});

dotenv.config();

mongoose
  .connect(String(process.env.CONNECTION_URL))
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port: ${process.env.PORT}...`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
