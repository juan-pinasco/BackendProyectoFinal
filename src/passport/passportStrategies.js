import passport from "passport";
import { usersModel } from "../DAL/db/models/users.model.js";
import { usersManager } from "../DAL/DAOs/users.manager.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { compareData } from "../utils.js";
//import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt"; //lo usamos para passport JWT

//const JWT_SECRET_KEY = "secretJWT"; //lo usamos para passport JWT

passport.use(
  "Login",
  new LocalStrategy(async function (username, password, done) {
    try {
      // vamos a ir abuscar a la base de datos si ese usuario existe con lo que me llego (con username, sin password)
      const userDB = await usersManager.findUser(username);
      if (!userDB) {
        return done(null, false);
      }
      // si llega hasta aca quiere decir que usuario(username) existe y vamos a compara la contraseña con hash  password si es la verdadera
      const isPasswordValid = await compareData(password, userDB.password);
      if (!isPasswordValid) {
        return done(null, false);
      }
      // si llega hasta aca quiere decir que la contraseña estaba bien y devuelve el usauario
      return done(null, userDB);
    } catch (error) {
      done(error);
    }
  })
);

passport.use(
  new GithubStrategy(
    {
      clientID: "Iv1.9b722dfdc5a79ce4",
      clientSecret: "20a8e52d5841ddefee20800dfae2eef706e636b5",
      callbackURL: "http://localhost:8080/api/users/github",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const userDB = await usersManager.findUser(profile.username);
        //login
        //si ese user viene de github o no
        if (userDB) {
          if (userDB.fromGithub) {
            return done(null, userDB);
          } else {
            //si no viene de github se lo cambio a false antes de que pase a registro
            return done(null, false);
          }
        }
        //register
        //una vez que llego aca se registra el usuario en la base de datos con estas propiedades
        const newUser = {
          first_name: profile.displayName.split(" ")[0],
          last_name: profile.displayName.split(" ")[1],
          username: profile.username,
          password: " ",
          isAdmin: false,
          fromGithub: true,
        };
        const result = await usersManager.create(newUser);
        return done(null, result);
      } catch (error) {
        done(error);
      }
    }
  )
);

//passport con JWT sin cookies
/* passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET_KEY,
    },
    async (jwt_payload, done) => {
      console.log("jwt_payload", jwt_payload);
      done(null, jwt_payload.user);
    }
  )
); */

//user => id
passport.serializeUser((usuario, done) => {
  done(null, usuario._id);
});

//id => user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await usersModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
