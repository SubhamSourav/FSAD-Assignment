const jwt = require("jsonwebtoken");
const { read } = require("./readWrite");

exports.authenticateToken = (req, res, next) => {
  const token =
    req.body.token || req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const { userId } = decoded;
  const users = read();
  const user = users.find((user) => user.id === userId);
  req.user = user;

  next();
};

exports.verifyRole = (role) => {
  return (req, res, next) => {
    if (role !== req.user.role) {
      return res
        .status(403)
        .json({ message: "You are not allowed to access this resource" });
    }
    next();
  };
};
