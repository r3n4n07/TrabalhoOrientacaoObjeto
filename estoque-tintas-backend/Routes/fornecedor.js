const express = require("express");
const Fornecedor = require("../Controllers/fornecedor");
const fornecedorRouter = express.Router();

fornecedorRouter.post("/fornecedor", Fornecedor.insertFornecedor);

fornecedorRouter.get("/fornecedor", Fornecedor.getFornecedor);

fornecedorRouter.get("/fornecedor/:id", Fornecedor.getFornecedorById);

fornecedorRouter.put("/fornecedor/:id", Fornecedor.updateFornecedor);

fornecedorRouter.delete("/fornecedor/:id", Fornecedor.deleteFornecedor);

module.exports = fornecedorRouter;