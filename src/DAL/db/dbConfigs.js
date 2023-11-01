import mongoose from "mongoose";
import config from "../../config.js";
import { logger } from "../../winston.js";

const URI = config.mongo;
//"mongodb+srv://juanpinascoprogramacion1:gNOTxPwE1hyrX3KB@cluster0.46weonh.mongodb.net/backendproyectofinal?retryWrites=true&w=majority";
mongoose
  .connect(URI)
  .then(() => logger.info("Conectado a la base de datos"))
  .catch((error) =>
    logger.error({
      error,
      message: "Error al intentar conectarse a la base de datos",
    })
  );
