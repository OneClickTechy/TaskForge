import express from "express";
import protectRoutes from "../middleware/protectRoutes.js";
import { getCategory, addCategory, updateCategory, deleteCategory } from "../controller/category.controller.js";

const router = express.Router();

router
  .route("/")
  .patch(protectRoutes, addCategory)
  .get(protectRoutes, getCategory)
  .delete(protectRoutes, deleteCategory);
router
  .route('/update')
  .patch(protectRoutes, updateCategory)
export default router;
