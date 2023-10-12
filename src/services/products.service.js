import { productsManager } from "../DAL/DAOs/products.manager.js";

export const findAll = async (obj) => {
  const products = await productsManager.findAll(obj);
  return products;
};

export const create = async (obj) => {
  const product = await productsManager.createOne(obj);
  return product;
};

export const findById = async (id) => {
  const product = await productsManager.findById(id);
  return product;
};

export const update = async (id, obj) => {
  const product = await productsManager.updateOne({ _id: id }, { ...obj });
  return product;
};

export const deleteOne = async (id) => {
  const response = await productsManager.deleteOne(id);
  return response;
};
