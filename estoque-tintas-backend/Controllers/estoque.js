const Estoque = require("../Models/Estoque");

const entrada = async (req, res) => {
    const { codProduto, quantidade, precoCusto, freteCompra, idi, despesasOperacionais, icmsSt,
            icms, fcpSt, precoMinVenda, lucroReal, lucroPorcent, precoVenda, idDeposito } = req.body;

    if(codProduto && quantidade && precoCusto && freteCompra && idi && despesasOperacionais && icmsSt &&
       icms && fcpSt && precoMinVenda && lucroReal && lucroPorcent && precoVenda && idDeposito) {
        const estoque = new Estoque(req);
        await estoque.entradaProdutos();
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
}

const saida = async (req, res) => {
    const { idSaldo, quantidade } = req.body;

    if(idSaldo && quantidade) {
        const estoque = new Estoque(req);
        const saidaRes = await estoque.saidaProdutos();

        if(saidaRes) {
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(400);
    }
}

const movimentacao = async (req, res) => {
    const { idSaldo, quantidade, idDeposito } = req.body;

    if(idSaldo && quantidade && idDeposito) {
        const estoque = new Estoque(req);
        const movimentacaoRes = await estoque.movimentacaoProdutos();

        if(movimentacaoRes) {
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(400);
    }
}

const getEstoque = async (req, res) => {
    const estoque = await Estoque.getEstoque();
    const estoqueJson = JSON.parse(JSON.stringify(estoque));
    res.statusCode = 200;
    return res.json(estoqueJson);
}

const getEstoqueById = async (req, res) => {
    const idSaldo = req.params.id;
    if(isNaN(idSaldo)) {
        res.sendStatus(400);
    } else {
        const estoque = new Estoque(req);
        const getEstoque = await estoque.getEstoqueById();
        if(Object.keys(getEstoque).length == 0) {
            res.sendStatus(204);
        } else {
            const estoqueJson = JSON.parse(JSON.stringify(getEstoque));
            res.statusCode = 200;
            return res.json(estoqueJson);
        }
    }
}

module.exports = { entrada, saida, movimentacao, getEstoque, getEstoqueById }