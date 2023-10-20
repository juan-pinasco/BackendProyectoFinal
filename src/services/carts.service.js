import { cartsManager } from "../DAL/DAOs/carts.manager.js";
import { productsManager } from "../DAL/DAOs/products.manager.js";
import { productsModel } from "../DAL/db/models/products.model.js";

export const findAll = async () => {
  const carts = await cartsManager.findAll();
  return carts;
};

export const create = async (obj) => {
  //export const create = async () => {
  const cart = await cartsManager.createOne(obj);
  //const cart = await cartsManager.createOne();
  return cart;
};

export const findById = async (id) => {
  const cart = await cartsManager.findById(id);
  return cart;
};

export const update = async (id, obj) => {
  const cart = await cartsManager.updateOne({ _id: id }, { ...obj });
  return cart;
};

export const deleteOne = async (id) => {
  const response = await cartsManager.deleteOne(id);
  return response;
};

//agregar productos al carrito
export const addProductToCart = async (cid, pid, quantity) => {
  try {
    // Verificar si el producto existe
    const product = await productsModel.findById(pid);
    if (!product) {
      throw new Error("Product not found");
    }
    // Obtener el carrito actual por su ID
    const cart = await cartsManager.findById(cid);
    // Verificar si el producto ya está en el carrito
    const existingProductIndex = cart.products.findIndex(
      (item) => item.product.toString() === pid
    );
    if (existingProductIndex !== -1) {
      // Si el producto ya está en el carrito, actualizar la cantidad
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      // Si el producto no está en el carrito, añadirlo
      cart.products.push({ product: pid, quantity });
    }
    // Calcular el nuevo totalAmount del carrito (según la lógica de precios de los productos)
    cart.totalAmount += product.price * quantity;
    // Guardar el carrito actualizado en la base de datos
    await cart.save();
    await cartsManager.findById(cid);
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

//calculateTotalAmount
export const calculateTotalAmount = async (cart) => {
  try {
    if (!cart) {
      throw new Error("Cart not found");
    }
    let totalAmount = 0;
    for (const productInfo of cart.products) {
      const product = await productsManager.findById(productInfo.product);
      if (product) {
        totalAmount += product.price * productInfo.quantity;
      }
    }

    cart.totalAmount = totalAmount;
    await cart.save(cart);
    return cart;
  } catch (error) {
    throw new Error("Error");
  }
};
