import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const secureRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, process.env.Security_Key);
    //console.log(decoded);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid Token" });
    }
    const user = await User.findById(decoded.userid).select("-password"); // current loggedin user
    if (!user) {
      return res.status(401).json({ error: "No user found" });
    }
      //console.log(user);
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in secureRoute: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export default secureRoute;