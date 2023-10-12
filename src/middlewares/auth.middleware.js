export const authMiddleware = (role) => {
  return (req, res, next) => {
    if (req.session.role !== role) {
      res.status(401).json({ message: "Action not authorized" });
    } else {
      next();
    }
    /* next(); */
  };
};
