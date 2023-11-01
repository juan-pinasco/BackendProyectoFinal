import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js"; //handlebars
import { __dirname } from "./utils.js";
import "./DAL/db/dbConfigs.js";
import cookieParser from "cookie-parser"; //Importamos cookie parse
import usersRouter from "./routes/users.router.js";
import jwtRouter from "./routes/jwt.router.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import "./passport/passportStrategies.js";
import config from "./config.js";
import { logger } from "./winston.js"; //logger
//
//El modulo que tuve que instalar de handlebars para que me tomara los objetos
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import exphbs from "express-handlebars";
import handlebars from "handlebars";
//

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use(cookieParser());

//sessions    LO COMENTE PARA QUE ME FUNCIONE JWT
app.use(
  session({
    store: new MongoStore({
      mongoUrl: config.mongo,
      //"mongodb+srv://juanpinascoprogramacion1:gNOTxPwE1hyrX3KB@cluster0.46weonh.mongodb.net/backendproyectofinal?retryWrites=true&w=majority",
    }),
    secret: "secretSession",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
);

//passport
app.use(passport.initialize());
app.use(passport.session()); //LO COMENTE PARA QUE ME FUNCIONE JWT

//routes
app.use("/api/views", viewsRouter); //handlebars
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", usersRouter);
app.use("/api/jwt", jwtRouter); //JWT
//loggger winston
app.get("/loggerTest", (req, res) => {
  logger.fatal("fatal"),
    logger.error("error"),
    logger.warning("warning"),
    logger.info("info"),
    logger.http("http"),
    logger.debug("debug"),
    res.send("Logger winston");
});

//puerto
const PORT = config.port;
app.listen(PORT, () => {
  logger.info(`escuchando al puerto ${PORT}`);
});
