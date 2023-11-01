const Fornecedor = require("../Models/Fornecedor");

const insertFornecedor = async (req, res) => {
    const { nomeFornecedor, cnpj, endereco, telefone, email } = req.body;
    if(nomeFornecedor && cnpj && endereco && telefone && email) {
        const fornecedor = new Fornecedor(req);
        await fornecedor.insertFornecedor();
        res.sendStatus(201);
    } else {
        res.sendStatus(400);
    }
}

const getFornecedor = async (req, res) => {
    const fornecedor = await Fornecedor.getFornecedor();
    const fornecedorJson = JSON.parse(JSON.stringify(fornecedor));
    res.statusCode = 200;
    return res.json(fornecedorJson);
}

const getFornecedorById = async (req, res) => {
    const idFornecedor = req.params.id;
    if(isNaN(idFornecedor)) {
        res.sendStatus(400);
    } else {
        const fornecedor = new Fornecedor(req);
        const getFornecedor = await fornecedor.getFornecedorById();
        if(Object.keys(getFornecedor).length == 0) {
            res.sendStatus(204);
        } else {
            const fornecedorJson = JSON.parse(JSON.stringify(getFornecedor));
            res.statusCode = 200;
            return res.json(fornecedorJson);
        }
    }
}

const updateFornecedor = async (req, res) => {
    const { nomeFornecedor, cnpj, endereco, telefone, email } = req.body;
    const idFornecedor = req.params.id;
    if(nomeFornecedor && cnpj && endereco && telefone && email && !isNaN(idFornecedor)) {
        const fornecedor = new Fornecedor(req);
        const getFornecedor = await fornecedor.getFornecedorById();

        if(Object.keys(getFornecedor).length == 0) {
            res.sendStatus(204);
        } else {
            await fornecedor.updateFornecedor();
            res.sendStatus(200);
        }
    } else {
        res.sendStatus(400);
    }
}

const deleteFornecedor = async (req, res) => {
    const idFornecedor = req.params.id;
    if(isNaN(idFornecedor)) {
        res.sendStatus(400);
    } else {
        const fornecedor = new Fornecedor(req);
        const getFornecedor = await fornecedor.getFornecedorById();

        if(Object.keys(getFornecedor).length == 0) {
            res.sendStatus(204);
        } else {
            await fornecedor.deleteFornecedor();
            res.sendStatus(200)
        }
    }
}

module.exports = { insertFornecedor, getFornecedor, getFornecedorById, updateFornecedor, deleteFornecedor }