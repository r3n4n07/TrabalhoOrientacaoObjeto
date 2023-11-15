const Sequelize = require("sequelize");
const connection = require("./database");
const Deposito = require("./Deposito");

const EstoqueORM = connection.define("ESTOQUE", {
    idSaldo: {
        type: Sequelize.INTEGER
    },
    codProduto: {
        type: Sequelize.INTEGER
    },
    quantidade: {
        type: Sequelize.INTEGER
    },
    precoCusto: {
        type: Sequelize.DECIMAL
    },
    freteCompra: {
        type: Sequelize.DECIMAL
    },
    idi: {
        type: Sequelize.DECIMAL
    },
    despesasOperacionais: {
        type: Sequelize.DECIMAL
    },
    icmsSt: {
        type: Sequelize.DECIMAL
    },
    icms: {
        type: Sequelize.DECIMAL
    },
    fcpSt: {
        type: Sequelize.DECIMAL
    },
    precoMinVenda: {
        type: Sequelize.DECIMAL
    },
    lucroReal: {
        type: Sequelize.DECIMAL
    },
    lucroPorcent: {
        type: Sequelize.DECIMAL
    },
    precoVenda: {
        type: Sequelize.DECIMAL
    },
    idDeposito: {
        type: Sequelize.INTEGER
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
},
{
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    freezeTableName: true,
    timestamps: false
});

EstoqueORM.removeAttribute('id');

class Estoque {
    constructor(req) {
        this.idSaldo = req.params.id == undefined ? req.body.idSaldo : req.params.id;
        this.codProduto = req.body.codProduto;
        this.quantidade = req.body.quantidade;
        this.precoCusto = req.body.precoCusto;
        this.freteCompra = req.body.freteCompra;
        this.idi = req.body.idi;
        this.despesasOperacionais = req.body.despesasOperacionais;
        this.icmsSt = req.body.icmsSt;
        this.icms = req.body.icms;
        this.fcpSt = req.body.fcpSt;
        this.precoMinVenda = req.body.precoMinVenda;
        this.lucroReal = req.body.lucroReal;
        this.lucroPorcent = req.body.lucroPorcent;
        this.precoVenda = req.body.precoVenda;
        this.idDeposito = req.body.idDeposito;
    }

    async entradaProdutos() {
        const { codProduto, quantidade, precoCusto, freteCompra, idi, despesasOperacionais, icmsSt,
                icms, fcpSt, precoMinVenda, lucroReal, lucroPorcent, precoVenda, idDeposito } = this;

        const estoque = await EstoqueORM.findAll({
            where: {
                codProduto,
                precoCusto,
                freteCompra,
                idi,
                despesasOperacionais,
                icmsSt,
                icms,
                fcpSt,
                precoMinVenda,
                lucroReal,
                lucroPorcent,
                precoVenda,
                idDeposito
            }
        });

        if(Object.keys(estoque).length == 0) {
            await EstoqueORM.create({
                codProduto,
                quantidade,
                precoCusto,
                freteCompra,
                idi,
                despesasOperacionais,
                icmsSt,
                icms,
                fcpSt,
                precoMinVenda,
                lucroReal,
                lucroPorcent,
                precoVenda,
                idDeposito
            });
        } else {
            await EstoqueORM.update({
                quantidade: parseInt(estoque[0].dataValues.quantidade) + parseInt(quantidade) }, {
                where: {
                    idSaldo: estoque[0].dataValues.idSaldo
                }
            });
        }
    }

    async saidaProdutos() {
        const { idSaldo, quantidade } = this;
        var error = 0;

        for(var i = 0; i <= idSaldo.length - 1; i++) {
            const estoque = await EstoqueORM.findAll({
                where: {
                    idSaldo: idSaldo[i]
                }
            });
            
            if(estoque[0].dataValues.quantidade < quantidade[i]) {
                error = 1;
            }
        }

        if(error == 1) {
            return false;
        } else {
            for(var i = 0; i <= idSaldo.length - 1; i++) {
                const estoque = await EstoqueORM.findAll({
                    where: {
                        idSaldo: idSaldo[i]
                    }
                });
    
                await EstoqueORM.update({ 
                    quantidade: parseInt(estoque[0].dataValues.quantidade) - parseInt(quantidade[i]) }, {
                    where: {
                        idSaldo: idSaldo[i]
                    }
                });
            }
            return true;
        }
    }

    async movimentacaoProdutos() {
        const { idSaldo, quantidade, idDeposito } = this;
        var error = 0;

        for(var i = 0; i <= idSaldo.length - 1; i++) {
            const estoque = await EstoqueORM.findAll({
                where: {
                    idSaldo: idSaldo[i]
                }
            });
            
            if(estoque[0].dataValues.quantidade < quantidade[i]) {
                error = 1;
            }
        }

        if(error == 1) {
            return false;
        } else {
            for(var i = 0; i <= idSaldo.length - 1; i++) {
                var estoque = await EstoqueORM.findAll({
                    where: {
                        idSaldo: idSaldo[i]
                    }
                });

                const quantidadeAnterior = estoque[0].dataValues.quantidade;

                console.log("Movimentando produto: " + idSaldo[i]);
                console.log("Quantidade: " + quantidade[i]);
                console.log("Para Depósito: " + idDeposito);


                await EstoqueORM.update({ 
                    quantidade: parseInt(quantidadeAnterior) - parseInt(quantidade[i]) }, {
                    where: {
                        idSaldo: idSaldo[i]
                    }
                });

                const { codProduto, precoCusto, freteCompra, idi,
                        despesasOperacionais, icmsSt, icms, fcpSt, precoMinVenda,
                        lucroReal, lucroPorcent, precoVenda } = estoque[0].dataValues;

                var estoque = await EstoqueORM.findAll({
                    where: {
                        codProduto,
                        precoCusto,
                        freteCompra,
                        idi,
                        despesasOperacionais,
                        icmsSt,
                        icms,
                        fcpSt,
                        precoMinVenda,
                        lucroReal,
                        lucroPorcent,
                        precoVenda,
                        idDeposito
                    }
                });

                
                console.log("Movimentando produto: " + idSaldo[i]);
                console.log("Quantidade: " + quantidade[i]);
                console.log("Para Depósito: " + idDeposito);
        
                if(Object.keys(estoque).length == 0) {
                    await EstoqueORM.create({
                        codProduto,
                        quantidade,
                        precoCusto,
                        freteCompra,
                        idi,
                        despesasOperacionais,
                        icmsSt,
                        icms,
                        fcpSt,
                        precoMinVenda,
                        lucroReal,
                        lucroPorcent,
                        precoVenda,
                        idDeposito
                    });
                } else {
                    await EstoqueORM.update({
                        quantidade: parseInt(estoque[0].dataValues.quantidade) + parseInt(quantidade[i]) }, {
                        where: {
                            idSaldo: estoque[0].dataValues.idSaldo
                        }
                    });
                }
            }
            return true;
        }
    }

    static async getEstoque() {
        try {
            const estoque = await EstoqueORM.findAll();

            return estoque;
        } catch (error) {
            console.error("Erro na consulta:", error);
            throw error; // Lança o erro para ser tratado no chamador da função
        }
    }

    async getEstoqueById() {
        try {
            const estoque = await EstoqueORM.findAll({
                where: {
                    idSaldo: this.idSaldo
                }
            });

            return estoque;
        } catch (error) {
            console.error("Erro na consulta:", error);
            throw error; // Lança o erro para ser tratado no chamador da função
        }
    }
}

module.exports = Estoque;