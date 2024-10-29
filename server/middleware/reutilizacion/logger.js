const express = require("express");

function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: "Error en el servidor", error: err.message });
}

function jsonParser(req, res, next) {
  express.json()(req, res, next);
}

module.exports = { logger, errorHandler, jsonParser };
