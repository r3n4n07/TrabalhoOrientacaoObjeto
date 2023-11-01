const Sequelize = require("sequelize");
const connection = require("./database");

const ProdutoORM = connection.define("PRODUTO", {
  codProduto: {
    type: Sequelize.INTEGER
  },
  nomeProduto: {
    type: Sequelize.STRING
  },
  skuProduto: {
    type: Sequelize.STRING
  },
  idFornecedor: {
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

ProdutoORM.removeAttribute('id');

class Produto {
    constructor(req) {
        this.codProduto = req.params.id;
        this.nomeProduto = req.body.nomeProduto;
        this.skuProduto = req.body.skuProduto;
        this.idFornecedor = req.body.idFornecedor;
    }

    async insertProduto() {
        try {
            const { nomeProduto, skuProduto, idFornecedor } = this;
            await ProdutoORM.create({ nomeProduto, skuProduto, idFornecedor });
        } catch (error) {
            console.error("Erro na consulta:", error);
            throw error; // Lança o erro para ser tratado no chamador da função
        }
    }

    static async getProduto() {
        try {
            const produto = await ProdutoORM.findAll();

            return produto;
        } catch (error) {
            console.error("Erro na consulta:", error);
            throw error; // Lança o erro para ser tratado no chamador da função
        }
    }

    async getProdutoById() {
        try {
            const produto = await ProdutoORM.findAll({
                where: {
                    codProduto: this.codProduto
                }
            });

            return produto;
        } catch (error) {
            console.error("Erro na consulta:", error);
            throw error; // Lança o erro para ser tratado no chamador da função
        }
    }

    async updateProduto() {
        try {
            const { codProduto, nomeProduto, skuProduto, idFornecedor } = this
            await ProdutoORM.update({ nomeProduto, skuProduto, idFornecedor }, {
                where: {
                    codProduto
                }
            });
        } catch (error) {
            console.error("Erro na consulta:", error);
            throw error; // Lança o erro para ser tratado no chamador da função
        }
    }

    async deleteProduto() {
        try {
            await ProdutoORM.destroy({
                where: {
                    codProduto: this.codProduto
                }
            });
        } catch (error) {
            console.error("Erro na consulta:", error);
            throw error; // Lança o erro para ser tratado no chamador da função
        }
    }
}

module.exports = Produto;