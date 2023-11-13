const express = require("express");
const app = express();
const http = require("http").createServer(app);
const connection = require("./Models/database");
const bodyParser = require("body-parser");
const cors = require("cors");
const usuarioRouter = require("./Routes/usuario");
const produtoRouter = require("./Routes/produto");
const fornecedorRouter = require("./Routes/fornecedor");
const depositoRouter = require("./Routes/deposito");
const estoqueRouter = require("./Routes/estoque");

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

app.use('/', usuarioRouter);

app.use('/', produtoRouter);

app.use('/', fornecedorRouter);

app.use('/', depositoRouter);

app.use('/', estoqueRouter);
    
http.listen(3000, () => {
    console.log("App rodando!");
});