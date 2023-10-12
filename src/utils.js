import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt"; //hasheo
import jwt from "jsonwebtoken"; //JWT

const JWT_SECRET_KEY = "secretJWT"; //JWT

export const __dirname = dirname(fileURLToPath(import.meta.url));

//hasheo
export const hashData = async (data) => {
  return bcrypt.hash(data, 10);
};

export const compareData = async (data, hashData) => {
  return bcrypt.compare(data, hashData);
};

//JWT
export const generateToken = (user) => {
  const token = jwt.sign({ user }, JWT_SECRET_KEY, { expiresIn: "1h" });
  return token;
};
