import {
  findAll,
  create,
  findById,
  //update,
  deleteOne,
  addProductToCart,
  calculateTotalAmount,
} from "../services/carts.service.js";
import { productsManager } from "../DAL/DAOs/products.manager.js";
import { generateUniqueCode } from "../codeGenerator.js";
import { createTicket } from "../services/tickets.service.js";

export const getCarts = async (req, res) => {
  try {
    const carts = await findAll();
    res.status(200).render("carts", { carts });
    /* if (carts.length) {
      //se redirija a handlebars "carts"
      res.status(200).render("carts", { carts });
    } else {
      res.status(200).json({ message: "There are no products" });
    } */
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getCartById = async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await findById(cid);
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
};

export const createCart = async (req, res) => {
  //const { products } = req.body;
  /* if (!title) {
    return res.status(400).json({ message: "Some data is missing" });
  }  */
  try {
    const newCart = await create(req.body);
    //const newCart = await create();
    //res.status(200).json({ mesagge: newCart });
    res.status(200).redirect("/api/carts");
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteCart = async (req, res) => {
  const { cid } = req.params;
  try {
    const deleteCart = await deleteOne(cid);
    res.status(200).redirect("/api/carts");
    /* res.status(200).json({ message: "Cart Delete", cart: deleteCart }); */
  } catch (error) {
    res.status(500).json({ error });
  }
};

//agregar producto al carrito
export const addProductToCartController = async (req, res) => {
  const { cid, pid, quantity } = req.body;
  try {
    const updatedCart = await addProductToCart(cid, pid, quantity);
    const cartPopulate = await updatedCart.populate("products.product");
    res
      .status(200)
      //.json({ message: "Product added to cart", cart: updatedCart });
      .json({ message: "Product added to cart", cart: cartPopulate });
  } catch (error) {
    res.status(500).json({ message: "error al agregar producto" });
  }
};

// /api/carts/:cid/purchase (compra ticket)
export const generateTicket = async (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = await findById(cartId);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    const productsNotPurchased = [];
    // Recorremos los productos en el carrito y verificamos stock
    for (const productInfo of cart.products) {
      const product = await productsManager.findById(productInfo.product);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      if (product.stock < productInfo.quantity) {
        productsNotPurchased.push(productInfo.product);
        continue;
      } else {
        product.stock -= productInfo.quantity;
        await product.save();
      }
    }
    cart.productsNotPurchased = productsNotPurchased;

    await calculateTotalAmount(cart);

    // Ticket con los datos de la compra
    const ticketData = {
      code: generateUniqueCode(),
      purchase_datetime: new Date(),
      amount: cart.totalAmount,
      purchaser: "JUAN",
    };
    const ticket = await createTicket(ticketData);

    await cart.save();

    res.status(201).json({
      message: "buy success",
      ticket,
      notPurchasedProducts: productsNotPurchased,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
