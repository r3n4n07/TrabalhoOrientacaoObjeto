const Sequelize = require("sequelize");
const connection = require("./database");

const FornecedorORM = connection.define("FORNECEDOR", {
  idFornecedor: {
    type: Sequelize.INTEGER
  },
  nomeFornecedor: {
    type: Sequelize.STRING
  },
  cnpj: {
    type: Sequelize.STRING
  },
  endereco: {
    type: Sequelize.STRING
  },
  telefone: {
    type: Sequelize.STRING
  },
  email: {
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

FornecedorORM.removeAttribute('id');

class Fornecedor {
    constructor(req) {
        this.idFornecedor = req.params.id;
        this.nomeFornecedor = req.body.nomeFornecedor;
        this.cnpj = req.body.cnpj;
        this.endereco = req.body.endereco;
        this.telefone = req.body.telefone;
        this.email = req.body.email;
    }

    async insertFornecedor() {
        try {
            const { nomeFornecedor, cnpj, endereco, telefone, email } = this;
            await FornecedorORM.create({ nomeFornecedor, cnpj, endereco, telefone, email });
        } catch (error) {
            console.error("Erro na consulta:", error);
            throw error; // Lança o erro para ser tratado no chamador da função
        }
    }

    static async getFornecedor() {
        try {
            const fornecedor = await FornecedorORM.findAll();

            return fornecedor;
        } catch (error) {
            console.error("Erro na consulta:", error);
            throw error; // Lança o erro para ser tratado no chamador da função
        }
    }

    async getFornecedorById() {
        try {
            const fornecedor = await FornecedorORM.findAll({
                where: {
                    idFornecedor: this.idFornecedor
                }
            });

            return fornecedor;
        } catch (error) {
            console.error("Erro na consulta:", error);
            throw error; // Lança o erro para ser tratado no chamador da função
        }
    }

    async updateFornecedor() {
        try {
            const { idFornecedor, nomeFornecedor, cnpj, endereco, telefone, email } = this;
            await FornecedorORM.update({ nomeFornecedor, cnpj, endereco, telefone, email }, {
                where: {
                    idFornecedor
                }
            });
        } catch (error) {
            console.error("Erro na consulta:", error);
            throw error; // Lança o erro para ser tratado no chamador da função
        }
    }

    async deleteFornecedor() {
        try {
            await FornecedorORM.destroy({
                where: {
                    idFornecedor: this.idFornecedor
                }
            });
        } catch (error) {
            console.error("Erro na consulta:", error);
            throw error; // Lança o erro para ser tratado no chamador da função
        }
    }
}

module.exports = Fornecedor;