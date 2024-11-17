import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const protectRoutes = async (req, res, next) => {
  let token;
  token = req.cookies["jwt"];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        return res.status(404).json({ error: "user not found" });
      }
      req.user = user;

      next();
    } catch (error) {
      return res.status(401).json({
        error: `Token Error :${error.message}`,
      });
    }
  } else {
    return res
      .status(401)
      .json({ error: "No token provided, authorization denied" });
  }
};

export default protectRoutes;
