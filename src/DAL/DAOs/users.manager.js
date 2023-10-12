import { usersModel } from "../db/models/users.model.js";

class UsersManager {
  //buscar todos los usuarios
  async findAll() {
    try {
      const allUsers = await usersModel.find({});
      return allUsers;
    } catch (error) {
      return error;
    }
  }

  async createOne(obj) {
    try {
      const newUser = await usersModel.create(obj);
      return newUser;
    } catch (error) {
      return error;
    }
  }

  async findById(id) {
    try {
      const user = await usersModel.findById(id);
      return user;
    } catch (error) {
      return error;
    }
  }

  //Las dos de abajo especiales
  async findUser(username) {
    try {
      const user = await usersModel.findOne({ username });
      return user;
    } catch (error) {
      return error;
    }
  }

  //role
  async deleteOne(username) {
    try {
      const user = await usersModel.findOneAndDelete(username);
      return user;
    } catch (error) {
      return error;
    }
  }

  async findUserByRole(role) {
    try {
      const response = await usersModel.findOne(role);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export const usersManager = new UsersManager();
