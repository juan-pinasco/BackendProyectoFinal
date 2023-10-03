import mongoose from "mongoose";

const URI =
  "mongodb+srv://juanpinascoprogramacion1:MYO4NCJjvqBQf6Bb@cluster0.46weonh.mongodb.net/backendproyectofinal?retryWrites=true&w=majority";
mongoose
  .connect(URI)
  .then(() => console.log("Conectado a la base de datos"))
  .catch((error) => console.log(error));
