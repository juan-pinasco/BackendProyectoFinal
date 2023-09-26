import { Router } from "express";
import { productsManager } from "../managers/products.manager.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productsManager.findAll();
    if (products.length) {
      res.status(200).json({ message: "Products", products });
    } else {
      res.status(200).json({ message: "There are no products" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productsManager.findById(pid);
    if (!product) {
      res.status(200).json({ message: "Invalid ID" });
    } else {
      res.status(200).json({ message: "Product", product });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  const { title, description, price, stock, code, category } = req.body;
  if (!title || !description || !price || !stock || !code || !category) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  try {
    const newProduct = await productsManager.createOne(req.body);
    res.status(200).json({ message: "Product created", product: newProduct });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const productUpdated = await productsManager.updateOne(pid, req.body);
    res.status(200).json({ message: "Product updated", productUpdated });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const deleteProduct = await productsManager.deleteOne(pid);
    res.status(200).json({ message: "Product Delete", product: deleteProduct });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
