import { Router } from "express";
import { getLogin, postLogin } from "../controllers/login.controller.js";
const router = Router();

/* router.get("/", (req, res) => {
  res.status(200).render("login");
});

router.post("/", (req, res) => {
  const { username, password } = req.body;
  req.session[`username`] = username;
  req.session[`password`] = password;
  //console.log(req);
  res.send("probando session");
}); */

router.get("/", getLogin);
router.post("/", postLogin);

export default router;
