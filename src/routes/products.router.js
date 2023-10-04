import { Router } from "express";
import { productsManager } from "../managers/products.manager.js";

const router = Router();

//---> /api/products
router.get("/", async (req, res) => {
  try {
    //const { limit = 10, page = 1 } = req.query; //CLASE 17
    //const { limit, page, query, sort } = req.query; //CLASE 18
    const products = await productsManager.findAll(req.query); //CLASE 18
    //console.log(products);
    //const products = await productsManager.findAll(limit, page); //CLASE 17
    //se redirija a handlebars "products"
    console.log(products);
    res.status(200).render("products", { products });
    //res.status(201).json({ message: "Products", products });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//---> /api/products/verDetalle/:pid
router.get("/verDetalle/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productsManager.findById(pid);
    /*  console.log(product); */
    if (!product) {
      res.status(200).json({ message: "Invalid ID" });
    } else {
      /* res.status(200).json({ message: "Product", product }); */
      //render quiere decir que me rendiriza la pagina de handlebars "productID"
      res.status(200).render("productID", { product });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/productoNuevo", async (req, res) => {
  const { title, description, price, stock, code, category } = req.body;
  if (!title || !description || !price || !stock || !code || !category) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  try {
    const newProduct = await productsManager.createOne(req.body);
    res.status(200).redirect("/api/products");
    /* res.status(200).json({ message: "Product created", product: newProduct }); */
  } catch (error) {
    res.status(500).json({ error });
  }
});

//le saque "router.put" y le puse "router.post" por que handlebars button tiene solo 2 metodos GET Y POST
router.post("/put/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const productUpdated = await productsManager.updateOne(pid, req.body);
    res.status(200).redirect(`/api/products/verDetalle/${pid}`);
    /* res.status(200).json({ message: "Product updated", productUpdated }); */
  } catch (error) {
    res.status(500).json({ error });
  }
});

//le saque "router.delete" y le puse "router.get" por que handlebars button tiene solo 2 metodos GET Y POST
router.get("/delete/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const deleteProduct = await productsManager.deleteOne(pid);
    res.status(200).redirect("/api/products");
    /* res.status(200).json({ message: "Product Delete", product: deleteProduct }); */
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
