const express = require("express");
const Estoque = require("../Controllers/estoque");
const estoqueRouter = express.Router();

estoqueRouter.post("/entrada", Estoque.entrada);

estoqueRouter.post("/saida", Estoque.saida);

estoqueRouter.post("/movimentacao", Estoque.movimentacao);

estoqueRouter.get("/estoque", Estoque.getEstoque);

estoqueRouter.get("/estoque/:id", Estoque.getEstoqueById);

module.exports = estoqueRouter;