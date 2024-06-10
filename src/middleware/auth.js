const authenticate = (req, res, next) => {
  if (global.currentUser) {
    req.user = global.currentUser;
  }
  next();
};

export default authenticate;
