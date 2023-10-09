import { dirname } from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken"; //JWT

const JWT_SECRET_KEY = "secretJWT"; //JWT

export const __dirname = dirname(fileURLToPath(import.meta.url));

//JWT
export const generateToken = (user) => {
  const token = jwt.sign({ user }, JWT_SECRET_KEY, { expiresIn: "1h" });
  return token;
};
