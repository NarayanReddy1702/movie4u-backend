import User from "../model/auth.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

async function authRegister(req, res) {
  try {
    const { username, email, password, role ,gender} = req.body;

    if (!username || !email || !password || !role || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(401)
        .json({ message: "Password length must be greater then 6" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already registered" });
    }

    var randowImage ;
  if(gender==="male"){
       randowImage = randowImage =`https://avatar.iran.liara.run/public/boy?username=${username}`
  }else{
     randowImage =  randowImage =`https://avatar.iran.liara.run/public/girl?username=${username}`
  }

    const hasPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hasPassword,
      profilePic: randowImage,
      role,
      gender
    });

    if (!newUser) {
      return res.status(404).json({ message: "Failed to create user" });
    }

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

    if (password.length < 6) {
      return res
        .status(401)
        .json({ message: "Password length must be greater then 6" });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "Invalid email or password" });
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

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true only in prod (HTTPS)
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour in ms
    });

    res
      .status(201)
      .json({
        message: "Login successfully !",
        existingUser,
        success: true,
        token,
      });
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

async function getUsers(req, res) {
  try {
    const allUser = await User.find();
    if (!allUser) {
      return res.status(409).json({ message: "User not Found !" });
    }
    res
      .status(201)
      .json({ message: "All user get successfully !", success: true, allUser });
  } catch (error) {
    res.status(404).json({ message: "Failed to get all user", success: false });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    const updateUser = await User.findOneAndUpdate(id, { username, email });
    if (!updateUser) {
      return res.status(404).json({ message: "Error while updateing user" });
    }
    res
      .status(201)
      .json({ message: "update User successfully !", success: true });
  } catch (error) {
    res.status(404).json({ message: "failed to update user", success: false });
  }
}
export { authRegister, authLogin, authLogout, getUsers ,updateUser };
