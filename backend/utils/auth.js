const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  // function for our authenticated routes
  authMiddleware: function (req, res, next) {
    const token = req.cookies.access_token;
    if (!token) {
      return res.json({ message: "no token" });
    }
    try {
      jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
        if (err) {
          console.log("token error " + err);
          return res.status(403).json({ message: "cannot verify token" });
        } else {
          req.user = data;
          next();
        }
      });
    } catch {
      return res.sendStatus(403).json({ message: "invalid token" });
    }
  },
  signToken: function ({ firstname, email, _id }) {
    const payload = { firstname, email, _id };
    return jwt.sign({ data: payload }, process.env.SECRET_KEY, {
    //   expiresIn: "60m",
    });
  },
};