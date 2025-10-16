import User from "../model/auth.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

async function authRegister(req, res) {
  try {
    const { username, email, password, role, gender } = req.body;

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

    var randowImage;
    if (gender === "male") {
      randowImage =
        randowImage = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    } else {
      randowImage =
        randowImage = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    }

    const hasPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hasPassword,
      profilePic: randowImage,
      role,
      gender,
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
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // Check user
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        _id: existingUser._id,
        email: existingUser.email,
        username: existingUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // token expiry
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // in development, false
      sameSite: "lax", // allows cross-origin requests in dev
      maxAge: 60 * 60 * 1000,
    });

    // Success response
    return res.status(200).json({
      message: "Login successful!",
      user: {
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        role: existingUser.role,
        profilePic: existingUser.profilePic,
        gender: existingUser.gender,
      },
      token,
      success: true,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
}

async function authLogout(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // same as when setting
      sameSite: "lax", // same as when setting
    });
    res.status(200).json({ message: "Logout Successfully!", success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to logout", success: false });
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
    const { username, email, gender } = req.body;

    // Generate profilePic
    let placeholderImg;
    if (gender === "male") {
      placeholderImg = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    } else {
      placeholderImg = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    }

    // Check if email is already used by another user
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== id) {
      return res
        .status(400)
        .json({
          message: "Email already in use by another user",
          success: false,
        });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, gender, profilePic: placeholderImg },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    res.status(200).json({
      message: "User updated successfully!",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Failed to update user", success: false });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(501)
        .json({ message: "Failed to get ID", success: false });
    }

    await User.findOneAndDelete({ _id: id });

    res
      .status(201)
      .json({ message: "Delete User Successfully !", success: true });
  } catch (error) {
    res.status(404).json({ message: "User Delete Error", success: false });
  }
}

async function getOneUser(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "UserId is Required !" });
    }
    const getOneUser = await User.findById(id);
    if (!getOneUser) {
      return res
        .status(404)
        .json({ message: "failed to  get one user", success: false });
    }
    res
      .status(201)
      .json({
        message: "Get user Successfully !",
        success: true,
        user: {
          username:getOneUser.username,
          email:getOneUser.email,
          gender:getOneUser.gender,
          profilePic:getOneUser.profilePic
        },
      });
  } catch (error) {
    res.status(404).json({ message: "Failed to get one user", success: false });
  }
}

export {
  authRegister,
  authLogin,
  authLogout,
  getUsers,
  updateUser,
  deleteUser,
  getOneUser,
};
