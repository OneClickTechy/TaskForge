import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

//init app
const app = express();

//configure to access environment file
dotenv.config();

//connect DataBase
connectDB();

//req body read middleware
app.use(express.json());

//req cookie read middleware
app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend's exact origin
  credentials: true                // Allow credentials (cookies, HTTP authentication)
}));

//routes
app.use("/api/auth", userRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/category", categoryRoutes);

//server port
const port = process.env.PORT;

//server listener
app.listen(port, () =>
  console.log(`Server is running on port ${port}
    http://localhost:${port}
    `)
);
