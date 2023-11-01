const express = require("express");
const Usuario = require("../Controllers/usuario");
const usuarioRouter = express.Router();

usuarioRouter.post("/usuario", Usuario.insertUsuario);

usuarioRouter.get("/usuario", Usuario.getUsuario);

usuarioRouter.get("/usuario/:id", Usuario.getUsuarioById);

usuarioRouter.put("/usuario/:id", Usuario.updateUsuario);

usuarioRouter.delete("/usuario/:id", Usuario.deleteUsuario);

usuarioRouter.post("/login", Usuario.loginUsuario);

module.exports = usuarioRouter;