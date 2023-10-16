import {
  findUser,
  createUser,
  deleteUser,
  findUserAll,
} from "../services/users.service.js";
import { hashData, compareData } from "../utils.js";

//LOGIN
export const getLogin = async (req, res) => {
  res.status(200).render("login");
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  if ((!username, !password)) {
    //si no puso todos los datos requeridos... le digo que se requieren mas datos
    return res.status(400).json({ message: "Required data is missing" });
  }
  const user = await findUser(username);
  if (!user) {
    //si el usuario no existe... le digo que debe ir a registrarse
    return res.status(400).json({ message: "You most register first" });
  }
  const isPasswordValid = await compareData(password, user.password);
  if (!isPasswordValid) {
    // Si al comparar la contraseñas de req.body y la ya guardada al registrarse en la base de datos, SON DISTINTAS... le digo contraseña incorrecta.
    return res.status(401).json({ message: "Password not vaild" });
  }
  //Si al comparar las contraseñas salio todo bien, inicio session
  req.session.user = {
    name: user.name,
    username: user.username,
    password: user.password,
    fromGithub: user.fromGithub,
    role: user.role,
    carts: user.carts,
  };
  //console.log(req.session.user);
  /* req.session[`username`] = username;
  const role = userDB.role;
  req.session[`role`] = role; */
  //res.status(200).render("profile", { user });
  res.status(200).redirect("/api/users/postLogin/current");
};

//REGISTER
export const getRegister = async (req, res) => {
  res.status(200).render("register");
};

export const postRegister = async (req, res) => {
  const { first_name, last_name, username, password, role } = req.body;
  if ((!first_name, !last_name, !username, !password, !role)) {
    //si no puso todos los datos reuqeridos... le digo que se requieren mas datos
    return res.status(400).json({ message: "Required data is missing" });
  }
  const userDB = await findUser(username);
  if (userDB) {
    //si el usuario ya existe... le digo que el username ya esta usado por otro
    return res.status(400).json({ message: "Username already used" });
  }
  //si llego hasta aca es por que todo ya salio bien y me va a hashear la contraseña, para luego guardar usuario en DB.
  const hashPassword = await hashData(password);
  const newUser = await createUser({ ...req.body, password: hashPassword });
  res.status(200).redirect("/api/users/getLogin");
  //res.status(200).json({ message: "User created", user: newUser });
};

//cerrar sesion
export const cerrarSesion = async (req, res) => {
  req.session.destroy((err) => {
    if (err)
      return res
        .status(500)
        .send({ status: "error", error: "no pudo cerrar sesion" });
    res.status(200).render("login");
  });
};

//role
export const findUserRole = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await findUser(username);
    if (!user) return res.status(404).json({ message: "User not found" });
    //res.status(200).json({ message: "User found", user });
    res.status(200).redirect("/api/users/postLogin");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUserRole = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await deleteUser(username);
    if (!user) return res.status(404).json({ message: "User not found" });
    //res.status(200).json({ message: "usuario borrado", user });
    res.status(200).redirect("/api/users/postLogin/current/allUsers");
  } catch (error) {
    res.status(500).json({ message: "error.message " });
  }
};

//buscar todo los usuarios
export const findAll = async (req, res) => {
  try {
    const users = await findUserAll();
    //console.log(req.session);
    res.status(200).render("todosUsuarios", { users });
    //res.status(201).json({ message: "todos los usuarios", users });
  } catch (error) {
    res.status(500).json({ error });
  }
};
