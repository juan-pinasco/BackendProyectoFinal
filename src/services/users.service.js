import { usersManager } from "../DAL/DAOs/users.manager.js";
import UserRegisterDto from "../DAL/DTOs/userRegister.dto.js";

// buscar todos los usuarios
export const findUserAll = async () => {
  const response = await usersManager.findAll();
  return response;
};

export const createUser = async (obj) => {
  const userDTO = new UserRegisterDto(obj);
  const response = await usersManager.createOne(userDTO);
  return response;
};

export const findUserID = async (id) => {
  const response = await usersManager.findById(id);
  return response;
};

//las 2 de abajo especiales
export const findUser = async (username) => {
  const response = await usersManager.findUser(username);
  return response;
};

//role
export const deleteUser = async (username) => {
  const response = await usersManager.deleteOne({ username });
  return response;
};
