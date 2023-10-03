import { Router } from "express";
import { cartsManager } from "../managers/carts.manager.js";

const router = Router();

//---> /api/carts (lista de carrito)
router.get("/", async (req, res) => {
  try {
    const carts = await cartsManager.findAll();
    if (carts.length) {
      //se redirija a handlebars "carts"
      res.status(200).render("carts", { carts });
    } else {
      res.status(200).json({ message: "There are no products" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

//---> /api/carts/verDetalle/:cid
router.get("/verDetalle/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartsManager.findById(cid);
    if (!cart._id) {
      res.status(400).json({ message: "Invalid CID" });
    } else {
      //render quiere decir que me rendiriza la pagina de handlebars "cartID"
      res.status(200).render("cartID", { cart });
      //res.status(200).json({ message: "cart found", cart });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/carritoNuevo", async (req, res) => {
  //const { products, price, quantity } = req.body;
  const { title } = req.body;
  //if (!products || !price || !quantity)
  if (!title) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  try {
    const newCart = await cartsManager.createOne(req.body);
    res.status(200).redirect("/api/carts");
    //res.status(200).json({ message: "carrito creado", mesagge: newCart });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/delete/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const deleteCart = await cartsManager.deleteOne(cid);
    res.status(200).redirect("/api/carts");
    /* res.status(200).json({ message: "Cart Delete", cart: deleteCart }); */
  } catch (error) {
    res.status(500).json({ error });
  }
});
//
//

export default router;
