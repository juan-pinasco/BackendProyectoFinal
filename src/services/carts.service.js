import { cartsManager } from "../DAL/DAOs/carts.manager.js";

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
