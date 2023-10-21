import {
  findAll,
  create,
  findById,
  deleteOne,
  addProductToCart,
} from "../services/carts.service.js";
import { cartsModel } from "../DAL/db/models/carts.model.js";
import { ticketModel } from "../DAL/db/models/tickets.model.js";

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
    const cart = await cartsModel.findById(cartId).populate("products.product"); // Obtener el carrito con los detalles de los productos
    const productsToPurchase = cart.products; // Productos en el carrito
    const productsNotPurchased = [];
    //console.log(cart.products);
    for (const item of productsToPurchase) {
      const product = item.product;
      const quantityToBuy = item.quantity;
      if (product.stock >= quantityToBuy) {
        // Si hay suficiente stock, restarlo del inventario y continuar
        product.stock -= quantityToBuy;
        await product.save();
      } else {
        // Si no hay suficiente stock, agregarlo a la lista de productos no comprados
        productsNotPurchased.push({
          productId: product._id.toString(),
          message:
            "No hay suficiente stock del producto para la cantidad solicitada",
          //quantity: (product.stock -= quantityToBuy),
        });
      }
    }
    // Crear el ticket con los detalles de la compra
    const ticket = new ticketModel({
      code: generateUniqueCode(), // Función para generar un código único
      amount: cart.totalAmount,
    });
    await ticket.save();
    // Actualizar el carrito con los productos no comprados
    cart.products = cart.products.filter((item) => {
      const productNotPurchased = productsNotPurchased.find(
        (p) => p.productId === item.product._id.toString()
      );
      if (productNotPurchased) {
        item.quantity -= productNotPurchased.quantity;
        return true;
      }
      return false;
    });
    await cart.save();
    res.json({
      TicketId: ticket._id,
      productsNotPurchased,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al procesar la compra." });
  }
};

// Función para generar un código único para el ticket
function generateUniqueCode() {
  return Math.random().toString(36).substr(2, 9);
}
