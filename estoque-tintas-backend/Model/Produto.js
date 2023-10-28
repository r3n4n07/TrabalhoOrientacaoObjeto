const Sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
const connection = require("./database");

const Produto = connection.define("PRODUTO", {
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

Produto.removeAttribute('id');

const insertProduto = async (nomeProduto, skuProduto, idFornecedor) => {
    try {
        await Produto.create({ nomeProduto, skuProduto, idFornecedor });
    } catch (error) {
        console.error("Erro na consulta:", error);
        throw error; // Lança o erro para ser tratado no chamador da função
    }
}

const deleteProduto = async (id) => {
    try {
        await Produto.destroy({
            where: {
                codProduto: id
            }
        });
    } catch (error) {
        console.error("Erro na consulta:", error);
        throw error; // Lança o erro para ser tratado no chamador da função
    }
}

const updateProduto = async (id, nomeProduto, skuProduto, idFornecedor) => {
    try {
        await Produto.update({ nomeProduto, skuProduto, idFornecedor }, {
            where: {
                codProduto: id
            }
        });
    } catch (error) {
        console.error("Erro na consulta:", error);
        throw error; // Lança o erro para ser tratado no chamador da função
    }
}

const getProduto = async () => {
    try {
        const produto = await Produto.findAll();

        return produto; // Retorna os pedidos
    } catch (error) {
        console.error("Erro na consulta:", error);
        throw error; // Lança o erro para ser tratado no chamador da função
    }
}

const getProdutoById = async (id) => {
    try {
        const produto = await Produto.findAll({
            where: {
                codProduto: id
            }
        });

        return produto; // Retorna os pedidos
    } catch (error) {
        console.error("Erro na consulta:", error);
        throw error; // Lança o erro para ser tratado no chamador da função
    }
}

module.exports = { insertProduto, getProduto, getProdutoById, deleteProduto, updateProduto };