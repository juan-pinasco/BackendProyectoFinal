import { cartsModel } from "../db/models/carts.model.js";

class CartsManager {
  async findAll() {
    try {
      const carts = await cartsModel.find({});
      return carts;
    } catch (error) {
      return error;
    }
  }
  async createOne(obj) {
    try {
      const newCart = await cartsModel.create(obj);
      return newCart;
    } catch (error) {
      return error;
    }
  }
  async findById(id) {
    try {
      const cart = await cartsModel
        .findById(id)
        .populate(
          "products" /* ,["title","price"] con products solo me trae todas las propiedades */
        );
      return cart;
    } catch (error) {
      return error;
    }
  }

  async updateOne(id, obj) {
    try {
      const response = await cartsModel.updateOne({ _id: id }, { ...obj });
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteOne(id) {
    try {
      const response = await cartsModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export const cartsManager = new CartsManager();
