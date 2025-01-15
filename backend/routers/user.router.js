import express from "express";
import {signup,Login,logout,allUsers} from "../controllers/user.controller.js"
import secureRoute from "../middleware/secureRoute.js";
const router = express.Router();


router.post("/Signup",signup);
router.post("/Login",Login)
router.post("/Logout",logout)
router.get("/alluser",secureRoute ,allUsers)

export default router;