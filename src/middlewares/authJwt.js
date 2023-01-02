const User = require("../models/User");
const Role = require("../models/Role");
const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    let token = "";
    if (authorization && authorization.toLowerCase().startsWith("bearer")) {
      token = authorization.substring(7);
    }
    // const token = bearerHeader.split(' ')[1];
    // const decodedToken= jwt.verify(token, process.env.JWT_SECRET)
    if (!token) return res.status(403).json({ message: "no token provided" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    const user = await User.findById(req.userId, { password: 0 });
    console.log(user);
    if (!user) return res.status(404).json({ message: "no user found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "No autorizado" });
  }
};
const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user.roles } });
  // eslint-disable-next-line no-unreachable-loop
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
    return res.status(403).json({ message: "Required Admin Role" });
  }
  next();
};
module.exports = {
  verifyToken,
  isAdmin,
};
