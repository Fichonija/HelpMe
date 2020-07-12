const jwt = require("jsonwebtoken");

// Middleware in Express is just a function with predetermined arguments
module.exports = (req, res, next) => {
  try {
    if (req.headers.authorization === undefined) {
      throw new Error(
        "Authorization header 'authorization' not present in request."
      );
    }
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret_this_should_be_longer");
    next();
  } catch (err) {
    res.status(401).json({
      message: "Authentication failed!",
      data: err.message,
    });
  }
};
