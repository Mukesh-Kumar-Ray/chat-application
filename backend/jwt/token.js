import jwt from "jsonwebtoken";
const generateTokenAndSaveInCookie = (userid, res) => {
    
  const token = jwt.sign({ userid }, process.env.SECURITY_KEY, {
    expiresIn: "10d",
  });
  
  res.cookie("jwt", token, {
    httpOnly: true, // Prevents JavaScript access
    secure: process.env.NODE_ENV === "production", // Secure in production
    sameSite: "Strict",
    // path:"/"
  });
 
  return token;
};

export default generateTokenAndSaveInCookie;
