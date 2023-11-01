import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  mongo: process.env.MONGO_URI,
  environment: process.env.ENVIRONMENT,
};
