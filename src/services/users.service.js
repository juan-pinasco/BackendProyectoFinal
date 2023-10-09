import { usersManager } from "../DAL/users.manager.js";
import bcrypt from "bcrypt";

export const createUser = async (user) => {
  const response = await usersManager.create(user);
  return response;
};

export const findUser = async (username) => {
  const response = await usersManager.findUser(username);
  return response;
};

export const findUserID = async (id) => {
  const response = await usersManager.findUserID(id);
  return response;
};

export const hashData = async (data) => {
  return bcrypt.hash(data, 10);
};

export const compareData = async (data, hashData) => {
  return bcrypt.compare(data, hashData);
};
