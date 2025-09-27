import User from "../model/auth.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

async function authRegister(req, res) {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
      
    if(password.length<6){
        return res.status(401).json({message:"Password length must be greater then 6"})
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already registered" });
    }

     const index= Math.floor(Math.random()*100)+1;
      const randowImage = `https://avatar.iran.liara.run/public/${index}.png`

     
    const hasPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hasPassword,
      profilePic:randowImage
    });

    if (!newUser) {
      return res.status().json({ message: "Failed to create user" });
    }

    const token = jwt.sign(
      {
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      },
      process.env.JWT_SECRET
    );

    res.cookie("Token", token);

    res
      .status(201)
      .json({ message: "Register successfully !", newUser, success: true });
  } catch (error) {
    res.status(404).json({ message: "Auth Register error", success: false });
  }
}

async function authLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if(password.length<6){
        return res.status(401).json({message:"Password length must be greater then 6"})
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      res.status(404).json({ message: "Invalid email or password" });
    }

    
    

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        _id: existingUser._id,
        email: existingUser.email,
        username: existingUser.username,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);

    res
      .status(201)
      .json({ message: "Login successfully !", existingUser, success: true , token });
  } catch (error) {
    res.status(404).json({ message: "Login Error", success: false });
  }
}

async function authLogout(req, res) {
  try {
    await res.clearCookie("Token");
    res.status(201).json({ message: "Logout Successfully !", success: true });
  } catch (error) {
    res.status(404).json({ message: "Failed to logout", success: false });
  }
}

async function getUsers(req,res){
   try {
      const allUser = await User.find()
      if(!allUser){
        return res.status(409).json({message:"User not Found !"})
      }
      res.status(201).json({message:'All user get successfully !',success:true,allUser})
   } catch (error) {
      res.status(404).json({message:"Failed to get all user",success:false})
   }

}
export { authRegister, authLogin, authLogout ,getUsers };
