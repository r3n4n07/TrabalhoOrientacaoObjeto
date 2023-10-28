const express = require("express");
require("dotenv").config();
const app = express();
const http = require("http").createServer(app);
const connection = require("./Model/database");
const bodyParser = require("body-parser");
const cors = require("cors");
const UsuarioModel = require("./Model/Usuario");
const FornecedorModel = require("./Model/Fornecedor");
const DepositoModel = require("./Model/Deposito");
const ProdutoModel = require("./Model/Produto");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Database Connection
connection
    .authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados estabelecida!");
    })
    .catch((msgError) => {
        console.log(msgError);
    });

app.use(cors());

app.get("/usuario", async (req, res) => {
    var usuario = await UsuarioModel.getUsuario();
    const usuariosJson = JSON.stringify(usuario);
    res.statusCode = 200;
    return res.json(usuariosJson);
});

app.get("/usuario/:id", async (req, res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        const id = req.params.id;
        var usuario = await UsuarioModel.getUsuarioById(id);
        if(Object.keys(usuario).length == 0) {
            res.sendStatus(204);
        } else {
            const usuariosJson = JSON.stringify(usuario);
            res.statusCode = 200;
            return res.json(usuariosJson);
        }
    }
});

app.post("/usuario", async (req, res) => {
    var { nome, senha } = req.body;
    if(nome && senha) {
        await UsuarioModel.insertUsuario(nome, senha);
        res.sendStatus(201);
    } else {
        res.sendStatus(400);
    }
});

app.post("/login", async (req, res) => {
    var { nome, senha } = req.body;
    if(nome && senha) {
        const loginAuthenticate = await UsuarioModel.loginUsuario(nome, senha);

        if(loginAuthenticate) {
            res.sendStatus(200);
        } else {
            res.sendStatus(406);
        }
    } else {
        res.sendStatus(400);
    }
});

app.put("/usuario/:id", async (req, res) => {
    var { nome, senha } = req.body;
    if(nome && senha && !isNaN(req.params.id)) {
        const id = req.params.id;
        var usuario = await UsuarioModel.getUsuarioById(id);

        if(Object.keys(usuario).length == 0) {
            res.sendStatus(204);
        } else {
            await UsuarioModel.updateUsuario(id, nome, senha);
            res.sendStatus(200);
        }
    } else {
        res.sendStatus(400);
    }
});

app.delete("/usuario/:id", async (req, res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        const id = req.params.id;
        var usuario = await UsuarioModel.getUsuarioById(id);

        if(Object.keys(usuario).length == 0) {
            res.sendStatus(204);
        } else {
            await UsuarioModel.deleteUsuario(id);
            res.sendStatus(200)
        }
    }
});


app.get("/fornecedor", async (req, res) => {
    var fornecedor = await FornecedorModel.getFornecedor();
    const fornecedorJson = JSON.stringify(fornecedor);
    res.statusCode = 200;
    return res.json(fornecedorJson);
});

app.get("/fornecedor/:id", async (req, res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        const id = req.params.id;
        var fornecedor = await FornecedorModel.getFornecedorById(id);
        if(Object.keys(fornecedor).length == 0) {
            res.sendStatus(204);
        } else {
            const fornecedorJson = JSON.stringify(fornecedor);
            res.statusCode = 200;
            return res.json(fornecedorJson);
        }
    }
});

app.post("/fornecedor", async (req, res) => {
    var { nomeFornecedor, cnpj, endereco, telefone, email } = req.body;
    if(nomeFornecedor && cnpj && endereco && telefone && email) {
        await FornecedorModel.insertFornecedor(nomeFornecedor, cnpj, endereco, telefone, email);
        res.sendStatus(201);
    } else {
        res.sendStatus(400);
    }
});

app.put("/fornecedor/:id", async (req, res) => {
    var { nomeFornecedor, cnpj, endereco, telefone, email } = req.body;
    if(nomeFornecedor && cnpj && endereco && telefone && email && !isNaN(req.params.id)) {
        const id = req.params.id;
        var fornecedor = await FornecedorModel.getFornecedorById(id);

        if(Object.keys(fornecedor).length == 0) {
            res.sendStatus(204);
        } else {
            await FornecedorModel.updateFornecedor(id, nomeFornecedor, cnpj, endereco, telefone, email);
            res.sendStatus(200);
        }
    } else {
        res.sendStatus(400);
    }
});

app.delete("/fornecedor/:id", async (req, res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        const id = req.params.id;
        var fornecedor = await FornecedorModel.getFornecedorById(id);

        if(Object.keys(fornecedor).length == 0) {
            res.sendStatus(204);
        } else {
            await FornecedorModel.deleteFornecedor(id);
            res.sendStatus(200)
        }
    }
});


app.get("/deposito", async (req, res) => {
    var deposito = await DepositoModel.getDeposito();
    const depositoJson = JSON.stringify(deposito);
    res.statusCode = 200;
    return res.json(depositoJson);
});

app.get("/deposito/:id", async (req, res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        const id = req.params.id;
        var deposito = await DepositoModel.getDepositoById(id);
        if(Object.keys(deposito).length == 0) {
            res.sendStatus(204);
        } else {
            const depositoJson = JSON.stringify(deposito);
            res.statusCode = 200;
            return res.json(depositoJson);
        }
    }
});

app.post("/deposito", async (req, res) => {
    var { nomeDeposito } = req.body;
    if(nomeDeposito) {
        await DepositoModel.insertDeposito(nomeDeposito);
        res.sendStatus(201);
    } else {
        res.sendStatus(400);
    }
});

app.put("/deposito/:id", async (req, res) => {
    var { nomeDeposito } = req.body;
    if(nomeDeposito && !isNaN(req.params.id)) {
        const id = req.params.id;
        var deposito = await DepositoModel.getDepositoById(id);

        if(Object.keys(deposito).length == 0) {
            res.sendStatus(204);
        } else {
            await DepositoModel.updateDeposito(id, nomeDeposito);
            res.sendStatus(200);
        }
    } else {
        res.sendStatus(400);
    }
});

app.delete("/deposito/:id", async (req, res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        const id = req.params.id;
        var deposito = await DepositoModel.getDepositoById(id);

        if(Object.keys(deposito).length == 0) {
            res.sendStatus(204);
        } else {
            await DepositoModel.deleteDeposito(id);
            res.sendStatus(200)
        }
    }
});


app.get("/produto", async (req, res) => {
    var produto = await ProdutoModel.getProduto();
    const produtoJson = JSON.stringify(produto);
    res.statusCode = 200;
    return res.json(produtoJson);
});

app.get("/produto/:id", async (req, res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        const id = req.params.id;
        var produto = await ProdutoModel.getProdutoById(id);
        if(Object.keys(produto).length == 0) {
            res.sendStatus(204);
        } else {
            const produtoJson = JSON.stringify(produto);
            res.statusCode = 200;
            return res.json(produtoJson);
        }
    }
});

app.post("/produto", async (req, res) => {
    var { nomeProduto, skuProduto, idFornecedor } = req.body;
    if(nomeProduto && skuProduto && idFornecedor) {
        await ProdutoModel.insertProduto(nomeProduto, skuProduto, idFornecedor);
        res.sendStatus(201);
    } else {
        res.sendStatus(400);
    }
});

app.put("/produto/:id", async (req, res) => {
    var { nomeProduto, skuProduto, idFornecedor } = req.body;
    if(nomeProduto && skuProduto && idFornecedor && !isNaN(req.params.id)) {
        const id = req.params.id;
        var produto = await ProdutoModel.getProdutoById(id);

        if(Object.keys(produto).length == 0) {
            res.sendStatus(204);
        } else {
            await ProdutoModel.updateProduto(id, nomeProduto, skuProduto, idFornecedor);
            res.sendStatus(200);
        }
    } else {
        res.sendStatus(400);
    }
});

app.delete("/produto/:id", async (req, res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        const id = req.params.id;
        var produto = await ProdutoModel.getProdutoById(id);

        if(Object.keys(produto).length == 0) {
            res.sendStatus(204);
        } else {
            await ProdutoModel.deleteProduto(id);
            res.sendStatus(200)
        }
    }
});
    
http.listen(3000, () => {
    console.log("App rodando!");
});