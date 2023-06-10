let bodyParser = require("body-parser");
let express = require("express");
let app = express();
require("dotenv").config();

console.log("Hello World");

app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  console.log(req.body);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app
  .route("/name")
  .get((req, res, next) => {
    res.json({ name: `${req.query.first} ${req.query.last}` });
    next();
  })
  .post((req, res, next) => {
    res.json({ name: `${req.body.first} ${req.body.last}` });
    // next();
  });

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
  let message = {
    message: "Hello json",
    console: process.env.MESSAGE_STYLE,
  };
  // console.log(process.env.MESSAGE_STYLE);
  if (process.env.MESSAGE_STYLE == "uppercase") {
    message["message"] = message["message"].toUpperCase();
  }
  res.json(message);
});
module.exports = app;





































 module.exports = app;
