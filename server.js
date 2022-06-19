const express = require("express");
const cors = require("cors");
require("dotenv").config();
var bodyParser = require("body-parser");

const app = express();
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 8081;
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ type: "application/*+json" }));
const authControllers = require("./controllers/auth.controller");

const authRoute = require("./routes/authRoute");
const studentRoute = require("./routes/studentRoute");
const teacherRoute = require("./routes/teacherRoute");

//global middle ware
app.use(async (req, res, next) => {
  console.log("url == ", req.url);
  if (
    req.url.includes("amin") ||
    req.url.includes("login") ||
    req.url.includes("logout") ||
    req.url.includes("signup")
  ) {
    next();
  } else {
    authControllers.authMiddleWare(req, res, next);
  }
});
app.listen(port, () => {
  console.log("working server");
});
app.use(studentRoute);
app.use(teacherRoute);
app.use(authRoute);

app.get("/amin", (req, res) => {
  console.log("Cookies: ", req.cookies);
  res.cookie("user", "1997");
  res.send("done now");
});
