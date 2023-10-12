import mongoose from "mongoose";
import config from "../../config.js";

const URI = config.mongo;
//"mongodb+srv://juanpinascoprogramacion1:gNOTxPwE1hyrX3KB@cluster0.46weonh.mongodb.net/backendproyectofinal?retryWrites=true&w=majority";
mongoose
  .connect(URI)
  .then(() => console.log("Conectado a la base de datos"))
  .catch((error) => console.log(error));
