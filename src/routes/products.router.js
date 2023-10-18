import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

//---> /api/products
router.get("/", getProducts);

//---> /api/products/verDetalle/:pid
router.get("/verDetalle/:pid", getProductById);

router.post("/productoNuevo", authMiddleware("admin"), createProduct);

//le saque "router.put" y le puse "router.post" por que handlebars button tiene solo 2 metodos GET Y POST
router.post("/put/:pid", authMiddleware("admin"), updateProduct);

//le saque "router.delete" y le puse "router.get" por que handlebars button tiene solo 2 metodos GET Y POST
router.get("/delete/:pid", authMiddleware("admin"), deleteProduct);

export default router;
