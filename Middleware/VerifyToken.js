const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let SecretKey = process.env.JWT_SECRET;
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log(authHeader);

  if (!authHeader) {
    res.status(400).send({ message: "Authorization not provided" });
  } else {
    if (!authHeader.startsWith("Bearer ")) {
      res.status(400).send({ message: "invalid auth format" });
    } else {
      let token = authHeader.split(" ")[1];
      jwt.verify(token, SecretKey, (err, decode) => {
        if (err) {
          res.status(400).send({ message: "error verifyin token" });
        } else {
          console.log("recieved Details : ", decode.user);
          req.user = decode.user;
          next();
        }
      });
    }
  }
};

module.exports = verifyToken;
