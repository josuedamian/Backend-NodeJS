const User = require("../models/User");
const Role = require("../models/Role");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const signUp = async (req, res) => {
  const { username, email, password, roles } = req.body;
  try {
    const newUser = await new User({ username, email, password, roles });
    const salt = bycrypt.genSaltSync(10);
    newUser.password = bycrypt.hashSync(password, salt);
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }
    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ msg: "ERROR", error: error.message });
  }
};
const signIn = async (req, res) => {
  const userfound = await User.findOne({ email: req.body.email }).populate(
    "roles"
  );
  if (!userfound) return res.status(400).json({ message: "user not found" });
  console.log(userfound);
  const matchPassword = bycrypt.compareSync(
    req.body.password,
    userfound.password
  );
  if (!matchPassword)
    return res.status(401).json({ token: null, message: "Invalid Password" });

  const token = jwt.sign({ id: userfound._id }, process.env.JWT_SECRET, {
    expiresIn: 86400, // 24 hours
  });
  res.json({ token });
};
module.exports = {
  signIn,
  signUp,
};
