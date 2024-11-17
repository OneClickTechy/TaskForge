import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";
import { deleteTask } from "./task.controller.js";
import { Task } from "../models/task.model.js";

export const checkEmail = async (req, res) => {
  
    const { email } = req.body;
    const user = await User.findOne({email})
    if(user){
      res.json({exists: true})
    } else {
      res.json({exists: false})
    }
  
}

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "please fill all fields" });
    }
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    const existEmail = await User.findOne({ email });
    const existUsername = await User.findOne({ username });
    if (existEmail || existUsername) {
      return res
        .status(400)
        .json({ error: "user name or email already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    createToken(res, user._id);

    res.status(201).json({
      message: "register successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error :" + error,
      details: process.env.NODE_ENV === "development" ? error.stack : null,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "please fill all" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid Credential" });
    }
    createToken(res, user._id);
    res.status(200).json({
      message: "login successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error :" + error,
      details: process.env.NODE_ENV === "development" ? error.stack : null,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === "production", // Only set 'secure' in production
      path: "/",
    });
    res.status(200).json({ message: "logout successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error :" + error,
      details: process.env.NODE_ENV === "development" ? error.stack : null,
    });
  }
};

// export const deleteUser = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     await User.findByIdAndDelete(userId);
//     await Task.deleteMany({ userId });
//     res.status(200).json({ message: "User and user's tasks are deleted" });
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

export const getme = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    res.status(200).json(req.user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error :" + error,
      details: process.env.NODE_ENV === "development" ? error.stack : null,
    });
  }
};
