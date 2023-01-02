const router = require("express").Router();
const { signUp, signIn } = require("../controllers/auth.controllers");
const userRoutes = (app) => {
  app.use("/api/v1", router);
  router.post("/signup", signUp);
  router.post("/signin", signIn);
};

module.exports = userRoutes;
