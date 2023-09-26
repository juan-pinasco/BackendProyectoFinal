import express from "express";
import productsRouter from "./routes/products.router.js";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import "./db/dbConfigs.js";
import viewsRouter from "./routes/views.router.js"; //handlebars

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//public
app.use(express.static(__dirname + "/public"));

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

//routes
app.use("/api/views", viewsRouter); //handlebars
app.use("/api/products", productsRouter);

//puerto
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`escuchando al puerto ${PORT}`);
});
