const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.json());

const filePath = path.join(__dirname, "user.json");

// GET / - Página principal con H1 y link a usuarios
app.get("/", (req, res) => {
  res.send(`
      <h1>Casita</h1>
      <a href="/user">Ir a usuarios</a>
    `);
});

// GET /user - Leer archivo user y devolver contenido, o Not Found si no existe
app.get("/user", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).send("Archivo user no encontrado.");
    }
    res.json(JSON.parse(data));
  });
});

// POST /user - Recibe datos y los agrega al archivo user
app.post("/user", (req, res) => {
  const newData = req.body;

  fs.readFile(filePath, "utf8", (err, data) => {
    let users = [];
    if (!err && data) {
      users = JSON.parse(data);
    }

    users.push(newData);

    fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Error al guardar datos.");
      }
      res.status(201).send("Datos agregados correctamente.");
    });
  });
});

// PUT /user - Actualizar archivo user con nuevos datos
app.put("/user", (req, res) => {
  const updatedUser = req.body;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).send("Archivo user no encontrado.");
    }

    let users = JSON.parse(data);
    const userIndex = users.findIndex(user => user.name === updatedUser.name);

    if (userIndex === -1) {
      return res.status(404).send("Usuario no encontrado.");
    }

    // Actualizamos solo los campos del usuario encontrado
    users[userIndex] = { ...users[userIndex], ...updatedUser };

    fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Error al actualizar datos.");
      }
      res.send("Usuario actualizado correctamente.");
    });
  });
});

// DELETE /user - Eliminar archivo user
app.delete("/user", (req, res) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(404).send("Archivo user no encontrado.");
    }
    res.send("Archivo eliminado correctamente.");
  });
});

// Ruta 404 para rutas inexistentes
app.use((req, res) => {
  res.status(404).send("Error 404: Ruta no encontrada.");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
