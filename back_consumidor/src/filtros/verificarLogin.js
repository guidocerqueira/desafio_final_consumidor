const knex = require('../conexao');
const jwt = require('jsonwebtoken');
const senhaHash = require('../senhaHash');

const verificarLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json('Acesso negado.');
    }

    try {
        const token = authorization.replace('Bearer ', '').trim();
        
        const { id } = jwt.verify(token, senhaHash);

        const verificarConsumidor = await knex('consumidor').where({ id: id }).first();

        if (!verificarConsumidor) {
            return res.status.json('Usuário não foi encontrado.');
        }

        const { senha, ...consumidor } = verificarConsumidor;

        req.consumidor = consumidor;

        next(); 
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = verificarLogin;