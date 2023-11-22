import { Router } from "express";
import {
  getCarts,
  getCartById,
  createCart,
  deleteCart,
  addProductToCartController,
  generateTicket,
} from "../controllers/carts.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

//---> /api/carts (lista de carrito)

router.get("/", getCarts);

//---> /api/carts/verDetalle/:cid
router.get("/verDetalle/:cid", getCartById);

router.post("/carritoNuevo", createCart);

router.get("/delete/:cid", deleteCart);

//agregar productos al carrito
router.post(
  "/agregarProducto",
  /* authMiddleware("user"), */
  addProductToCartController
);

//Generador de ticket
router.post("/:cid/purchase", generateTicket);

export default router;
