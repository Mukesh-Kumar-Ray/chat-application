import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routers/user.router.js";
import messageRouter from "./routers/message.router.js"
import cookieParser from "cookie-parser";
import cors from "cors";
//import path from "path"
import {app,server} from "./socketIO/server.js"

dotenv.config();



//middleware

app.use(express.json());
app.use(cookieParser());
app.use(cors(
  // {
  //   origin:[],
  //   methods: ["POST","GET"],
  //   credentials:true
  // }

  {
    credentials: true // Allow sending cookies
  }
));

app.use(urlencoded({ extended: true }));

const port = process.env.PORT;
const mongodb_url = process.env.MONGODB_URL;

try {
  mongoose.connect(mongodb_url);
  console.log("database successfully connected");
} catch (error) {
  console.log(error);
  process.exit(1)
}

//routing

app.use("/api/user", userRouter);
app.use("/api/message",messageRouter)

// app.use("/", (req, res) => {
//   res.send("jai saraswati mata dii......");
// });

//-----------production code-----------

// if(process.env.NODE_ENV === "production"){
//   const dirPath = path.resolve();
//   app.use(express.static("./frontend/dist"));
//   app.get("*",(req,res)=>{
//     res.sendFile(path.resolve(dirPath,"./frontend/dist","index.html"));
//   })
// }

server.listen(port, () => {
  console.log(`app is running on ${port}`);
});
