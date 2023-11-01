const Sequelize = require("sequelize");
const connection = require("./database");
const bcrypt = require('bcrypt');

const UsuarioORM = connection.define("USUARIO", {
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

UsuarioORM.removeAttribute('id');

class Usuario {
    constructor(req) {
        this.id = req.params.id;
        this.nome = req.body.nome;
        this.senha = req.body.senha;
    }

    async insertUsuario() {
        try {
            const { nome, senha } = this;
            const saltRounds = 10;
            bcrypt.hash(senha, saltRounds, async (err, hash) => {
                await UsuarioORM.create({ nome, senha: hash });
            });
        } catch (error) {
            console.error("Erro na consulta:", error);
            throw error; // Lança o erro para ser tratado no chamador da função
        }
    }

    static async getUsuario() {
        try {
            const usuarios = await UsuarioORM.findAll();

            return usuarios;
        } catch (error) {
            console.error("Erro na consulta:", error);
            throw error; // Lança o erro para ser tratado no chamador da função
        }
    }

    async getUsuarioById() {
        try {
            const usuario = await UsuarioORM.findAll({
                where: {
                    idUsuario: this.id
                }
            });

            return usuario;
        } catch (error) {
            console.error("Erro na consulta:", error);
            throw error; // Lança o erro para ser tratado no chamador da função
        }
    }
    
    async updateUsuario() {
        try {
            const { id, nome, senha } = this;
            const saltRounds = 10;

            bcrypt.hash(senha, saltRounds, async (err, hash) => {
                await UsuarioORM.update({ nome, senha: hash }, {
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

    async deleteUsuario() {
        try {
            await UsuarioORM.destroy({
                where: {
                    idUsuario: this.id
                }
            });
        } catch (error) {
            console.error("Erro na consulta:", error);
            throw error; // Lança o erro para ser tratado no chamador da função
        }
    }

    async loginUsuario() {
        try {
            const { nome, senha } = this;
            const usuario = await UsuarioORM.findAll({
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
}

module.exports = Usuario;