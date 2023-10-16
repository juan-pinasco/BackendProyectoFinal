export const authMiddleware = (role) => {
  return (req, res, next) => {
    //console.log(req.session.user);
    if (req.session.user.role !== role) {
      res.status(401).json({ message: "Action not authorized" });
    } else {
      next();
    }
    /* next(); */
  };
};
