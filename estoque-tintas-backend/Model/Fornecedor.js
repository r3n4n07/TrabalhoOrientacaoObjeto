const Sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
const connection = require("./database");

const Fornecedor = connection.define("FORNECEDOR", {
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

Fornecedor.removeAttribute('id');

const insertFornecedor = async (nomeFornecedor, cnpj, endereco, telefone, email) => {
    try {
        await Fornecedor.create({ nomeFornecedor, cnpj, endereco, telefone, email });
    } catch (error) {
        console.error("Erro na consulta:", error);
        throw error; // Lança o erro para ser tratado no chamador da função
    }
}

const deleteFornecedor = async (id) => {
    try {
        await Fornecedor.destroy({
            where: {
                idFornecedor: id
            }
        });
    } catch (error) {
        console.error("Erro na consulta:", error);
        throw error; // Lança o erro para ser tratado no chamador da função
    }
}

const updateFornecedor = async (id, nomeFornecedor, cnpj, endereco, telefone, email) => {
    try {
        await Fornecedor.update({ nomeFornecedor, cnpj, endereco, telefone, email }, {
            where: {
                idFornecedor: id
            }
        });
    } catch (error) {
        console.error("Erro na consulta:", error);
        throw error; // Lança o erro para ser tratado no chamador da função
    }
}

const getFornecedor = async () => {
    try {
        const fornecedor = await Fornecedor.findAll();

        return fornecedor; // Retorna os pedidos
    } catch (error) {
        console.error("Erro na consulta:", error);
        throw error; // Lança o erro para ser tratado no chamador da função
    }
}

const getFornecedorById = async (id) => {
    try {
        const fornecedor = await Fornecedor.findAll({
            where: {
                idFornecedor: id
            }
        });

        return fornecedor; // Retorna os pedidos
    } catch (error) {
        console.error("Erro na consulta:", error);
        throw error; // Lança o erro para ser tratado no chamador da função
    }
}

module.exports = { insertFornecedor, getFornecedor, getFornecedorById, deleteFornecedor, updateFornecedor };