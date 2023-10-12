import { Router } from "express";
import {
  getCarts,
  getCartById,
  createCart,
  deleteCart,
} from "../controllers/carts.controller.js";

const router = Router();

//---> /api/carts (lista de carrito)

router.get("/", getCarts);

//---> /api/carts/verDetalle/:cid
router.get("/verDetalle/:cid", getCartById);

router.post("/carritoNuevo", createCart);

router.get("/delete/:cid", deleteCart);
//
//

export default router;
