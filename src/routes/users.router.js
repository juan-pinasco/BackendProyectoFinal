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
import { findUserID } from "../services/users.service.js";
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
  function (req, res) {
    res.redirect("/api/users/adminOrClient");
  }
);

//views con passport local
router.get("/adminOrClient", async (req, res) => {
  const { user } = req.session.passport;
  const userDB = await findUserID(user);
  if (userDB.isAdmin) {
    res.status(200).render("adminHome");
  } else {
    res.status(200).render("clientHome");
  }
});

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
    successRedirect: "/api/users/adminOrClient",
  })
);

//role
router.get("/:username", /* authMiddleware("pre") ,*/ findUserRole);

router.get("/deleteUser/:username", authMiddleware("admin"), deleteUserRole);
export default router;
