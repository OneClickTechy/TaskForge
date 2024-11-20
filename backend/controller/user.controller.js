import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { CLIENT_URL } from "../constants/client.constant.js";
import Category from "../models/category.model.js";

export const checkEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.json({ exists: true });
  } else {
    res.json({ exists: false });
  }
};

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

    const defaultCategory = ['My Tasks'];
    const category = new Category({
      categories: defaultCategory,
      userId: user._id,
    })
    await category.save();
    user.categoryId = category._id;
    user.save();
    console.log(user, category);
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
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "please fill all" });
    }
    const user = await User.findOne({ email });
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

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_APP_EMAIL,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Password",
      html: `<h1>Reset Your Password</h1>
      <p>Click on the following link to reset your password:</p>
      <a href="${CLIENT_URL}/reset-password/${token}">${CLIENT_URL}/reset-password/${token}</a>
      <p>The link will expire in 10 minutes.</p>
      <p>If you didn't request a password reset, please ignore this email.</p>`,
    }

    
      transporter.sendMail(mailOptions, (error, info) => {
        if(error){
          res.status(500).json({error: error?.message});
        }
        res.status(200).json({message: info?.response});
      })
    

  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      stack: process.env.NODE_ENV === "devlopment" ? error.stack : null,
    });
  }
};

export const resetPassword = async (req, res) => {
  
  try {
    const { token, password } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
    if(!decoded){
      return res.status(401).json({error: "Invalid token"})
    }
  
    const user = await User.findOne({_id: decoded.userId})
  
    if(!user){
      return res.status(404).json({error: 'user not found'})
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({message: 'password reset successfully'})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}
