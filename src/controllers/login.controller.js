import {} from "../services/login.service.js";

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

export const getLogin = (req, res) => {
  res.status(200).render("login");
};

export const postLogin = (req, res) => {
  const { username, password } = req.body;
  req.session[`username`] = username;
  req.session[`password`] = password;
  //console.log(req);
  res.send("probando session");
};
