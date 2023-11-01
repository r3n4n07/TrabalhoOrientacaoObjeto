const Usuario = require("../Models/Usuario");

const insertUsuario = async (req, res) => {
    const { nome, senha } = req.body;
    if(nome && senha) {
        const novoUsuario = new Usuario(req);
        await novoUsuario.insertUsuario();
        res.sendStatus(201);
    } else {
        res.sendStatus(400);
    }
}

const getUsuario = async (req, res) => {
    const usuario = await Usuario.getUsuario();
    const usuariosJson = JSON.parse(JSON.stringify(usuario));
    res.statusCode = 200;
    return res.json(usuariosJson);
}

const getUsuarioById = async (req, res) => {
    const id = req.params.id;
    if(isNaN(id)) {
        res.sendStatus(400);
    } else {
        const usuario = new Usuario(req);
        const getUsuario = await usuario.getUsuarioById();
        if(Object.keys(getUsuario).length == 0) {
            res.sendStatus(204);
        } else {
            const usuariosJson = JSON.parse(JSON.stringify(getUsuario));
            res.statusCode = 200;
            return res.json(usuariosJson);
        }
    }
}

const updateUsuario = async (req, res) => {
    const { nome, senha } = req.body;
    const id = req.params.id;
    if(nome && senha && !isNaN(id)) {
        const usuario = new Usuario(req);
        const getUsuario = await usuario.getUsuarioById();

        if(Object.keys(getUsuario).length == 0) {
            res.sendStatus(204);
        } else {
            await usuario.updateUsuario();
            res.sendStatus(200);
        }
    } else {
        res.sendStatus(400);
    }
}

const deleteUsuario = async (req, res) => {
    const id = req.params.id;
    if(isNaN(id)) {
        res.sendStatus(400);
    } else {
        const usuario = new Usuario(req);
        const getUsuario = await usuario.getUsuarioById();

        if(Object.keys(getUsuario).length == 0) {
            res.sendStatus(204);
        } else {
            await usuario.deleteUsuario();
            res.sendStatus(200)
        }
    }
}

const loginUsuario = async (req, res) => {
    const { nome, senha } = req.body;
    if(nome && senha) {
        const usuario = new Usuario(req);
        const loginAuthenticate = await usuario.loginUsuario(req);

        if(loginAuthenticate) {
            res.sendStatus(200);
        } else {
            res.sendStatus(406);
        }
    } else {
        res.sendStatus(400);
    }
}

module.exports = { insertUsuario, getUsuario, getUsuarioById, updateUsuario, deleteUsuario, loginUsuario };