const Sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
const connection = require("./database");
const bcrypt = require('bcrypt');

const Usuario = connection.define("USUARIO", {
  idUsuario: {
    type: Sequelize.INTEGER
  },
  nome: {
    type: Sequelize.STRING
  },
  senha: {
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

Usuario.removeAttribute('id');

const insertUsuario = async (nome, senha) => {
    try {
        const saltRounds = 10;
        bcrypt.hash(senha, saltRounds, async (err, hash) => {
            await Usuario.create({ nome, senha: hash });
        });
    } catch (error) {
        console.error("Erro na consulta:", error);
        throw error; // Lança o erro para ser tratado no chamador da função
    }
}

const deleteUsuario = async (id) => {
    try {
        await Usuario.destroy({
            where: {
                idUsuario: id
            }
        });
    } catch (error) {
        console.error("Erro na consulta:", error);
        throw error; // Lança o erro para ser tratado no chamador da função
    }
}

const updateUsuario = async (id, nome, senha) => {
    try {
        const saltRounds = 10;

        bcrypt.hash(senha, saltRounds, async (err, hash) => {
            await Usuario.update({ nome, senha: hash }, {
                where: {
                    idUsuario: id
                }
            });
        });
    } catch (error) {
        console.error("Erro na consulta:", error);
        throw error; // Lança o erro para ser tratado no chamador da função
    }
}

const getUsuario = async () => {
    try {
        const usuarios = await Usuario.findAll();

        return usuarios; // Retorna os pedidos
    } catch (error) {
        console.error("Erro na consulta:", error);
        throw error; // Lança o erro para ser tratado no chamador da função
    }
}

const getUsuarioById = async (id) => {
    try {
        const usuario = await Usuario.findAll({
            where: {
                idUsuario: id
            }
        });

        return usuario; // Retorna os pedidos
    } catch (error) {
        console.error("Erro na consulta:", error);
        throw error; // Lança o erro para ser tratado no chamador da função
    }
}

const loginUsuario = async (nome, senha) => {
    try {
        const usuario = await Usuario.findAll({
            where: {
                nome: nome
            }
        });

        const hashSenha = usuario[0].dataValues.senha;

        const loginAuthenticate = await bcrypt.compare(senha, hashSenha);
        
        return loginAuthenticate;
    } catch (error) {
        console.error("Erro na consulta:", error);
        throw error; // Lança o erro para ser tratado no chamador da função
    }
}

module.exports = { insertUsuario, getUsuario, getUsuarioById, deleteUsuario, updateUsuario, loginUsuario };