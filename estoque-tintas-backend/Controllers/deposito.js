const Deposito = require("../Models/Deposito");

const insertDeposito = async (req, res) => {
    const { nomeDeposito } = req.body;
    if(nomeDeposito) {
        const deposito = new Deposito(req);
        await deposito.insertDeposito();
        res.sendStatus(201);
    } else {
        res.sendStatus(400);
    }
}

const getDeposito = async (req, res) => {
    const deposito = await Deposito.getDeposito();
    const depositoJson = JSON.parse(JSON.stringify(deposito));
    res.statusCode = 200;
    return res.json(depositoJson);
}

const getDepositoById = async (req, res) => {
    const idDeposito = req.params.id;
    if(isNaN(idDeposito)) {
        res.sendStatus(400);
    } else {
        const deposito = new Deposito(req);
        const getDeposito = await deposito.getDepositoById();
        if(Object.keys(getDeposito).length == 0) {
            res.sendStatus(204);
        } else {
            const depositoJson = JSON.parse(JSON.stringify(getDeposito));
            res.statusCode = 200;
            return res.json(depositoJson);
        }
    }
}

const updateDeposito = async (req, res) => {
    const { nomeDeposito } = req.body;
    const idDeposito = req.params.id;
    if(nomeDeposito && !isNaN(idDeposito)) {
        const deposito = new Deposito(req);
        const getDeposito = await deposito.getDepositoById();

        if(Object.keys(getDeposito).length == 0) {
            res.sendStatus(204);
        } else {
            await deposito.updateDeposito();
            res.sendStatus(200);
        }
    } else {
        res.sendStatus(400);
    }
}

const deleteDeposito = async (req, res) => {
    const idDeposito = req.params.id;
    if(isNaN(idDeposito)) {
        res.sendStatus(400);
    } else {
        const deposito = new Deposito(req);
        const getDeposito = await deposito.getDepositoById();

        if(Object.keys(getDeposito).length == 0) {
            res.sendStatus(204);
        } else {
            await deposito.deleteDeposito();
            res.sendStatus(200)
        }
    }
}

module.exports = { insertDeposito, getDeposito, getDepositoById, updateDeposito, deleteDeposito }