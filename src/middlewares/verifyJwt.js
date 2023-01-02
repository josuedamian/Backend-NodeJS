const Patient = require("../models/Patient");
const checkDuplicateDni = async (req, res, next) => {
  const patient = await Patient.findOne({ dni: req.body.dni });
  if (patient)
    return res.status(400).json({ message: "the user already exist" });
  next();
};
module.exports = { checkDuplicateDni };
