const Sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
const connection = require("./database");

const Deposito = connection.define("DEPOSITO", {
  idDeposito: {
    type: Sequelize.INTEGER
  },
  nomeDeposito: {
    type: Sequelize.STRING
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

Deposito.removeAttribute('id');

const insertDeposito = async (nomeDeposito) => {
    try {
        await Deposito.create({ nomeDeposito });
    } catch (error) {
        console.error("Erro na consulta:", error);
        throw error; // Lança o erro para ser tratado no chamador da função
    }
}

const deleteDeposito = async (id) => {
    try {
        await Deposito.destroy({
            where: {
                idDeposito: id
            }
        });
    } catch (error) {
        console.error("Erro na consulta:", error);
        throw error; // Lança o erro para ser tratado no chamador da função
    }
}

const updateDeposito = async (id, nomeDeposito) => {
    try {
        await Deposito.update({ nomeDeposito }, {
            where: {
                idDeposito: id
            }
        });
    } catch (error) {
        console.error("Erro na consulta:", error);
        throw error; // Lança o erro para ser tratado no chamador da função
    }
}

const getDeposito = async () => {
    try {
        const deposito = await Deposito.findAll();

        return deposito; // Retorna os pedidos
    } catch (error) {
        console.error("Erro na consulta:", error);
        throw error; // Lança o erro para ser tratado no chamador da função
    }
}

const getDepositoById = async (id) => {
    try {
        const deposito = await Deposito.findAll({
            where: {
                idDeposito: id
            }
        });

        return deposito; // Retorna os pedidos
    } catch (error) {
        console.error("Erro na consulta:", error);
        throw error; // Lança o erro para ser tratado no chamador da função
    }
}

module.exports = { insertDeposito, getDeposito, getDepositoById, deleteDeposito, updateDeposito };