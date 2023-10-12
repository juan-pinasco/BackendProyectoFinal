import {
  findAll,
  create,
  findById,
  //update,
  deleteOne,
} from "../services/carts.service.js";

export const getCarts = async (req, res) => {
  try {
    const carts = await findAll();
    if (carts.length) {
      //se redirija a handlebars "carts"
      res.status(200).render("carts", { carts });
    } else {
      res.status(200).json({ message: "There are no products" });
    }
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
  //const { products, price, quantity } = req.body;
  const { title } = req.body;
  //if (!products || !price || !quantity)
  if (!title) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  try {
    const newCart = await create(req.body);
    res.status(200).redirect("/api/carts");
    //res.status(200).json({ message: "carrito creado", mesagge: newCart });
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
