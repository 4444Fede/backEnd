const express = require("express");
const { logger, errorHandler, jsonParser } = require("./logger");
const app = express();

app.use(logger);
app.use(jsonParser);

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Faltan datos de usuario" });
  }
  res
    .status(201)
    .json({ message: "Usuario registrado con éxito", user: req.body });
});

app.get("/protected", (req, res) => {
  const token = req.headers["authorization"];
  if (token && token === "Bearer token123") {
    return res.json({ message: "Acceso permitido a ruta protegida" });
  }
  res.status(401).json({ message: "No autorizado" });
});

app.use(errorHandler);

const port = 2500;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
