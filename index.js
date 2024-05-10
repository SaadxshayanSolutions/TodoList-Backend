const express = require("express");
const dotenv = require("dotenv");
const dbConncection = require("./DatabaseConnection/dbConnection");
const bodyParser = require("body-parser");
const cors = require("cors");

const todosRoutes = require("./Routes/todosRoutes");
const usersRoutes = require("./Routes/usersRoutes");
const { authToken } = require("./Util/Toke");
const { loggedInUser } = require("./Controllers/UsersController");

dotenv.config();
dbConncection();

const port = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/todos", todosRoutes);
app.use("/users", usersRoutes);
app.get("/loginCheck", authToken, loggedInUser);

app.get("/", (req, res) => {
  return res.send("hello world");
});

app.listen(port, () => {
  console.log("App is running on port", port);
});
