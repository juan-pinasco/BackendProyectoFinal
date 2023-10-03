import { Router } from "express";
import { productsManager } from "../managers/products.manager.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("home");
});

/* router.get("/listaProductos", async (req, res) => {
  const products = await productsManager.findAll(); // req.query ;
  res.status(200).render("products", { products });
  console.log(products);
}); */

export default router;
