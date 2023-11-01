const Sequelize = require("sequelize");
const connection = require("./database");

const DepositoORM = connection.define("DEPOSITO", {
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

DepositoORM.removeAttribute('id');


class Deposito {
    constructor(req) {
        this.idDeposito = req.params.id;
        this.nomeDeposito = req.body.nomeDeposito;
    }

    async insertDeposito() {
        try {
            const { nomeDeposito } = this;
            await DepositoORM.create({ nomeDeposito });
        } catch (error) {
            console.error("Erro na consulta:", error);
            throw error; // Lança o erro para ser tratado no chamador da função
        }
    }

    static async getDeposito() {
        try {
            const deposito = await DepositoORM.findAll();

            return deposito;
        } catch (error) {
            console.error("Erro na consulta:", error);
            throw error; // Lança o erro para ser tratado no chamador da função
        }
    }

    async getDepositoById() {
        try {
            const deposito = await DepositoORM.findAll({
                where: {
                    idDeposito: this.idDeposito
                }
            });

            return deposito;
        } catch (error) {
            console.error("Erro na consulta:", error);
            throw error; // Lança o erro para ser tratado no chamador da função
        }
    }

    async updateDeposito() {
        try {
            const { idDeposito, nomeDeposito } = this;
            await DepositoORM.update({ nomeDeposito }, {
                where: {
                    idDeposito
                }
            });
        } catch (error) {
            console.error("Erro na consulta:", error);
            throw error; // Lança o erro para ser tratado no chamador da função
        }
    }

    async deleteDeposito() {
        try {
            await DepositoORM.destroy({
                where: {
                    idDeposito: this.idDeposito
                }
            });
        } catch (error) {
            console.error("Erro na consulta:", error);
            throw error; // Lança o erro para ser tratado no chamador da função
        }
    }
}

module.exports = Deposito;