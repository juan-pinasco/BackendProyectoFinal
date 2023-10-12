import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

const router = Router();

//---> /api/products
router.get("/", getProducts);

//---> /api/products/verDetalle/:pid
router.get("/verDetalle/:pid", getProductById);

router.post("/productoNuevo", createProduct);

//le saque "router.put" y le puse "router.post" por que handlebars button tiene solo 2 metodos GET Y POST
router.post("/put/:pid", updateProduct);

//le saque "router.delete" y le puse "router.get" por que handlebars button tiene solo 2 metodos GET Y POST
router.get("/delete/:pid", deleteProduct);

export default router;
