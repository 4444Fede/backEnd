const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain");

  if (req.method === "GET" && req.url === "/") {
    res.statusCode = 200;
    res.end("Bienvenido al servidor.");
  } else if (req.method === "GET" && req.url === "/about") {
    res.statusCode = 200;
    res.end("Soy un desarrollador aprendiendo Node.js.");
  } else if (req.method === "GET" && req.url === "/error") {
    res.statusCode = 404;
    res.end("Error 404: Ruta no encontrada.");
  } else {
    res.statusCode = 404;
    res.end("Ruta no encontrada.");
  }
});

const port = 3000;

server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
