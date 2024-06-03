const authenticate = (req, res, next) => {
  if (global.currentUser) {
    next();
  } else {
    res.status(401).json({
      success: false,
      message: "You have to be logged in to view your order history",
      status: 401,
    });
  }
};

export default authenticate;
