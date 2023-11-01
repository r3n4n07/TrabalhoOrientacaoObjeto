const Produto = require("../Models/Produto");

const insertProduto = async (req, res) => {
    const { nomeProduto, skuProduto, idFornecedor } = req.body;
    if(nomeProduto && skuProduto && idFornecedor) {
        const produto = new Produto(req);
        await produto.insertProduto();
        res.sendStatus(201);
    } else {
        res.sendStatus(400);
    }
}

const getProduto = async (req, res) => {
    const produto = await Produto.getProduto();
    const produtoJson = JSON.parse(JSON.stringify(produto));
    res.statusCode = 200;
    return res.json(produtoJson);
}

const getProdutoById = async (req, res) => {
    const codProduto = req.params.id;
    if(isNaN(codProduto)) {
        res.sendStatus(400);
    } else {
        const produto = new Produto(req);
        const getUsuario = await produto.getProdutoById();
        if(Object.keys(getUsuario).length == 0) {
            res.sendStatus(204);
        } else {
            const produtoJson = JSON.parse(JSON.stringify(getUsuario));
            res.statusCode = 200;
            return res.json(produtoJson);
        }
    }
}

const updateProduto = async (req, res) => {
    const { nomeProduto, skuProduto, idFornecedor } = req.body;
    const codProduto = req.params.id;
    if(nomeProduto && skuProduto && idFornecedor && !isNaN(codProduto)) {
        const produto = new Produto(req);
        const getProduto = await produto.getProdutoById();

        if(Object.keys(getProduto).length == 0) {
            res.sendStatus(204);
        } else {
            await produto.updateProduto();
            res.sendStatus(200);
        }
    } else {
        res.sendStatus(400);
    }
}

const deleteProduto = async (req, res) => {
    const codProduto = req.params.id;
    if(isNaN(codProduto)) {
        res.sendStatus(400);
    } else {
        const produto = new Produto(req);
        const getProduto = await produto.getProdutoById();

        if(Object.keys(getProduto).length == 0) {
            res.sendStatus(204);
        } else {
            await produto.deleteProduto();
            res.sendStatus(200)
        }
    }
}

module.exports = { insertProduto, getProduto, getProdutoById, updateProduto, deleteProduto };