import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js"; //handlebars
import { __dirname } from "./utils.js";
import "./db/dbConfigs.js";
//import cookieParser from "cookie-parser"; //Importamos cookie parse
import loginRouter from "./routes/login.router.js";
import registerRouter from "./routes/register.router.js";
import session from "express-session";
import MongoStore from "connect-mongo";

//el modulo que tuve que instalar de handlebars para que me tomara los objetos
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import exphbs from "express-handlebars";
import handlebars from "handlebars";
//

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* //public
app.use(express.static(__dirname + "/public"));
//handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views"); */
//

//public
app.use(express.static(__dirname + "/public"));
app.engine(
  "handlebars",
  exphbs.engine({ handlebars: allowInsecurePrototypeAccess(handlebars) })
);
app.set("view engine", "handlebars");
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

//cookies
//app.use(cookieParser())

//sessions
app.use(
  session({
    store: new MongoStore({
      mongoUrl:
        "mongodb+srv://juanpinascoprogramacion1:cjniVzLuMOPNMTLs@cluster0.46weonh.mongodb.net/backendproyectofinal?retryWrites=true&w=majority",
    }),
    secret: "secretSession",
    cookie: { maxAge: 10000 },
  })
);

//routes
app.use("/api/views", viewsRouter); //handlebars
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);

//puerto
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`escuchando al puerto ${PORT}`);
});
