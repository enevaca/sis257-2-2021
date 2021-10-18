const express = require("express");
const logger = require("morgan");
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middelwares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rourtes
app.get("/", (req, res) => {
  res.send("Hola Mundo GET");
});

app.post("/", (req, res) => {
  res.send({ saludo: "Hola Mundo POST" });
});

// Static files
app.use(express.static(__dirname + "/public"));

// Server listening
app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});
