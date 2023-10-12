import { productsModel } from "../db/models/products.model.js";

class ProductsManager {
  async findAll(obj) {
    const { limit = 10, page = 1, sortPrice, ...query } = obj;
    try {
      const result = await productsModel.paginate(query, {
        limit,
        page,
        sort: { price: sortPrice },
      });
      const info = {
        status: result.status,
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasNextPage: result.hasNextPage ? true : false,
        hasPrevPage: result.hasPrevPage ? true : false,
        nextLink: result.hasNextPage
          ? `http://localhost:8080/api/products?page=${result.nextPage}`
          : null,
        prevLink: result.hasPrevPage
          ? `http://localhost:8080/api/products?page=${result.prevPage}`
          : null,
        limit: result.limit,
        query,
      };
      return info;
    } catch (error) {
      return error;
    }
  }

  async createOne(obj) {
    try {
      const newProduct = await productsModel.create(obj);
      return newProduct;
    } catch (error) {
      return error;
    }
  }
  async findById(id) {
    try {
      const product = await productsModel.findById(id);
      return product;
    } catch (error) {
      return error;
    }
  }

  async updateOne(id, obj) {
    try {
      const response = await productsModel.updateOne({ _id: id }, { ...obj });
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteOne(id) {
    try {
      const response = await productsModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export const productsManager = new ProductsManager();
