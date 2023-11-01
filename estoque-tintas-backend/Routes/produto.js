const express = require("express");
const Produto = require("../Controllers/produto");
const produtoRouter = express.Router();

produtoRouter.post("/produto", Produto.insertProduto);

produtoRouter.get("/produto", Produto.getProduto);

produtoRouter.get("/produto/:id", Produto.getProdutoById);

produtoRouter.put("/produto/:id", Produto.updateProduto);

produtoRouter.delete("/produto/:id", Produto.deleteProduto);

module.exports = produtoRouter;