const express = require("express");
const Deposito = require("../Controllers/deposito");
const depositoRouter = express.Router();

depositoRouter.post("/deposito", Deposito.insertDeposito);

depositoRouter.get("/deposito", Deposito.getDeposito);

depositoRouter.get("/deposito/:id", Deposito.getDepositoById);

depositoRouter.put("/deposito/:id", Deposito.updateDeposito);

depositoRouter.delete("/deposito/:id", Deposito.deleteDeposito);

module.exports = depositoRouter;