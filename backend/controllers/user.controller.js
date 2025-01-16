import bcryptjs from "bcryptjs"; // Import bcrypt for password hashing
import User from "../models/user.model.js";
import generateTokenAndSaveInCookie from "../jwt/token.js"

export const signup = async (req, res) => {
  try {
    const { fullname, email, password, confirmPassword } = req.body;

    if (!fullname || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Please fill all fields." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(409).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ fullname, email, password: hashedPassword });

    await newUser.save();
    const token = generateTokenAndSaveInCookie(newUser._id, res);

    res.status(201).json({
      message: "User created successfully",
      user: { _id: newUser._id, fullname: newUser.fullname, email: newUser.email },
      token,
    });
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};


//login 

export const Login = async (req,res)=>{
    //   console.log("successfully login new user")
    const {email,password}=req.body;
    try {
      const user = await User.findOne({email});
      const ismatch = await bcryptjs.compare(password,user.password);
      
      if(!user || !ismatch){
        return res.status(400).json({message:"incorrect password "})
      }

      generateTokenAndSaveInCookie(user._id,res);
     
      res.status(200).json({message:"user successfully",user:{
        id:user._id,
        fullname: user.fullname,
        email: user.email,
      }})
      

    } catch (error) {
      console.error("Error during login:", error.message);
      res.status(500).json({message:"there is some problem in login"})
    }
    
}

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const allUsers = async (req, res) => {
  try {
   const loggedInUser = req.user._id;
     //console.log(loggedInUser);
    //console.log(req);
    const filteredUsers = await User.find({
       _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json(error);
    //console.log("Error in allUsers Controller: " + error);
  }
};