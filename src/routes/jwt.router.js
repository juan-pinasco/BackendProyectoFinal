import { Router } from "express";
import { usersManager } from "../DAL/DAOs/users.manager.js";
import { generateToken } from "../utils.js";
import { compareData } from "../utils.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";
//import passport from "passport"; //Lo usamos con passport JWT
const router = Router();

// Sin cookies
/* router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    if ((!username, !password)) {
      //si no puso todos los datos requeridos... le digo que se requieren mas datos
      return res.status(400).json({ message: "Required data is missing" });
    }
    const userDB = await usersManager.findUser(username);
    if (!userDB) {
      //si el usuario no existe... le digo que debe ir a registrarse
      return res.status(400).json({ message: "You most register first" });
    }
    const isPasswordValid = await compareData(password, userDB.password);
    if (!isPasswordValid) {
      // Si al comparar la contraseñas de req.body y la ya guardada al registrarse en la base de datos, SON DISTINTAS... le digo contraseña incorrecta.
      return res.status(401).json({ message: "Password not vaild" });
    }
    //Si al comparar las contraseñas salio todo bien, genero token con datos del usuario y los mando a db
    const token = generateToken(userDB);
    res.status(200).json({ message: "Token generated", token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}); */

// Con cookies
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    if ((!username, !password)) {
      //si no puso todos los datos requeridos... le digo que se requieren mas datos
      return res.status(400).json({ message: "Required data is missing" });
    }
    const userDB = await usersManager.findUser(username);
    if (!userDB) {
      //si el usuario no existe... le digo que debe ir a registrarse
      return res.status(400).json({ message: "You most register first" });
    }
    const isPasswordValid = await compareData(password, userDB.password);
    if (!isPasswordValid) {
      // Si al comparar la contraseñas de req.body y la ya guardada al registrarse en la base de datos, SON DISTINTAS... le digo contraseña incorrecta.
      return res.status(401).json({ message: "Password not vaild" });
    }
    //Si al comparar las contraseñas salio todo bien, genero token con datos del usuario en COOKIES(para mayor seguridad) y los mando a db
    req.session[`username`] = username;
    const role = userDB.role;
    req.session[`role`] = role;
    const token = generateToken(userDB);
    res
      .status(200)
      .cookie("token", token)
      //.json({ message: "Token generated", token });
      .render("profile", { userDB });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/validation", jwtValidation, (req, res) => {
  res.json({ ...req.user });
});

//Lo usamos con passport JWT sin cookies
/*router.get(
  "/validation",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "Probando", user: req.user });
  }
); */

export default router;
