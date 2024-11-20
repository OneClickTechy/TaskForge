import Category from "../models/category.model.js";

export const addCategory = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { newCategory } = req.body;

    if (!newCategory)
      return res.status(400).send("no category found from request");

    const categoryDoc = await Category.findOne({ userId });
    if (!categoryDoc) {
      const newCategoryDoc = new Category({
        categories: [newCategory],
        userId,
      });
      await newCategory.save();
      res.status(201).json(newCategory);
    }

    if (!categoryDoc?.categories?.includes(newCategory)) {
      categoryDoc.categories.push(newCategory);
      await categoryDoc.save();
      res.status(200).json(categoryDoc);
    } else {
      res.status(400).json({ error: "Category already exist" });
    }
  } catch (error) {
    console.error("Error creating category:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCategory = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    const category = await Category.findOne({ userId });
    if (!category) {
      res.status(404).json({ error: "Category not found for this user" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error.stack);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { oldCategory, newCategory } = req.body;

    if (!oldCategory || !newCategory) {
      return res.status(400).json({
        error: "Insufficient data: oldCategory and newCategory are required.",
      });
    }

    const categoryDoc = await Category.findOne({ userId });

    if (!categoryDoc) {
      return res.status(404).json({ error: "Category document not found" });
    }

    if (categoryDoc.categories.includes(newCategory)) {
      return res.status(400).json({ error: "This category already exist" });
    }

    if (categoryDoc.categories.includes(oldCategory)) {
      categoryDoc.categories = categoryDoc.categories.map((item, index) =>
        item === oldCategory ? newCategory : item
      );
      await categoryDoc.save();
      return res.status(200).json(categoryDoc);
    } else {
      return res.status(404).json({ error: "Old category not found" });
    }
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { category } = req.body;
    if(!category){
      return res.status(400).json({'error': 'category is required'})
    }
    const categoryDoc = await Category.findOne({ userId });
    if (!categoryDoc) {
      return res.status(404).json({ error: "Category document not found" });
    }
    if (categoryDoc.categories.includes(category)) {
      if (categoryDoc.categories[0] === category) {
        return res.status(400).json({ error: "can't delete default category" });
      }
      categoryDoc.categories = categoryDoc.categories.filter(
        (item) => item !== category
      );
      await categoryDoc.save();
      return res.status(200).json(categoryDoc);
    } else {
      return res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
};
