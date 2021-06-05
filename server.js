const dotenv = require("dotenv");
const sequelize = require("sequelize");
const http = require("http");
const socketIO = require("socket.io");

dotenv.config({ path: "./config.env" });
const app = require("./app");
const db = require("./models");
const server = http.createServer();
const IO = socketIO(server);

const port = process.env.PORT || 3333;

db.sequelize.authenticate().then(() => {
  server.listen(port, () => {
    console.log(`listening to the ${port}`);
  });
});
