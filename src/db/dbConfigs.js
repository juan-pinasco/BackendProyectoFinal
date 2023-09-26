import mongoose from "mongoose";

const URI =
  "mongodb+srv://juanpinascoprogramacion1:5I5CHdt1SCsT92Qb@cluster0.46weonh.mongodb.net/backendproyectofinal?retryWrites=true&w=majority";
mongoose
  .connect(URI)
  .then(() => console.log("Conectado a la base de datos"))
  .catch((error) => console.log(error));
