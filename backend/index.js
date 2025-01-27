import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routers/user.router.js";
import messageRouter from "./routers/message.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socketIO/server.js";

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "https://chat-application-ten-sooty.vercel.app",
  methods: ["GET", "POST"],
  credentials: true,
}));

const port = process.env.PORT;
const mongodb_url = process.env.MONGODB_URL;

try {
  mongoose.connect(mongodb_url);
  console.log("database successfully connected");
} catch (error) {
  console.log(error);
  process.exit(1);
}

app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

server.listen(port, () => {
  console.log(`app is running on ${port}`);
});