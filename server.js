const dotenv = require("dotenv");
const sequelize = require("sequelize");

dotenv.config({ path: "./config.env" });
const app = require("./app");
const db = require("./models");
const port = process.env.PORT || 3333;

db.sequelize.authenticate().then(() => {
  app.listen(port, () => {
    console.log(`listening to the ${port}`);
  });
});
