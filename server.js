const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const createRoles = require("./src/helpers/initialSetup");
const dbConnect = require("./src/config/dbconnect");
const userRoutes = require("./src/routes/user.routes");
const patientsRoutes = require("./src/routes/patient.routes");

class Server {
  constructor() {
    this.app = express();
    this.createRoles();
    this.port = process.env.PORT;
    this.middlewares();
    this.routes();
    this.dbConnect();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
  }

  dbConnect() {
    dbConnect();
  }

  createRoles() {
    createRoles();
  }

  routes() {
    userRoutes(this.app);
    patientsRoutes(this.app);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(
        `Server corriendo en el puerto:http://localhost:${this.port}`
      );
    });
  }
}

module.exports = Server;
