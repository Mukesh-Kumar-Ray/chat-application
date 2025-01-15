import jwt from "jsonwebtoken";
const generateTokenAndSaveInCookie = (userid, res) => {
    
  const token = jwt.sign({ userid }, process.env.Security_Key, {
    expiresIn: "10d",
  });
  
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true, 
    sameSite: "strict",
    // path:"/"
  });
 
  return token;
};

export default generateTokenAndSaveInCookie;
