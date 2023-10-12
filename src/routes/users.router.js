import { Router } from "express";
import {
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  cerrarSesion,
  findUserRole,
  deleteUserRole,
  findAll,
} from "../controllers/users.controller.js";
import passport from "passport";
import { findUser } from "../services/users.service.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

//login
router.get("/getLogin", getLogin);
router.post("/postLogin", postLogin);

//register
router.get("/getRegister", getRegister);
router.post("/postRegister", postRegister);

//cerrar sesion
router.get("/logout", cerrarSesion);

//All users
router.get("/allUsers", findAll);

//passport local
router.post(
  "/postLoginLocal",
  passport.authenticate("Login", { failureRedirect: "/api/users/getLogin" }),
  async (req, res) => {
    /* req.session.user = req.user;
    res.render("profile", { userDB: req.user }); */
    const { username } = req.body;
    const userDB = await findUser(username);
    req.session[`username`] = username;
    const role = userDB.role;
    req.session[`role`] = role;
    res.status(200).render("profile", { userDB });
  }
);

//github
router.get(
  "/registerGithub",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);
router.get(
  "/github",
  passport.authenticate("github", {
    failureRedirect: "/api/users/getLogin",
  }),
  async (req, res) => {
    req.session.user = req.user;
    res.render("profile", { userDB: req.user });
  }
  //successRedirect: "/api/users/adminOrClient",
);

//role
router.get("/:username", /* authMiddleware("pre") ,*/ findUserRole);

router.get("/deleteUser/:username", authMiddleware("admin"), deleteUserRole);
export default router;
