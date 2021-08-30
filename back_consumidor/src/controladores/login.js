const knex = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaHash = require('../senhaHash');
const schemaLogin = require('../validacoes/schemaLogin');

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        await schemaLogin.validate(req.body);
        
        const consumidor = await knex('consumidor').where({ email }).first();

        if (!consumidor) {
            return res.status(404).json('Email ou senha estão incorretos.');
        }

        const validarSenha = await bcrypt.compare(senha, consumidor.senha);

        if (!validarSenha) {
            return res.status(404).json('Email ou senha estão incorretos.');
        }

        const dadosTokenConsumidor = {
            id: consumidor.id,
            email: consumidor.email
        };

        const token = jwt.sign(dadosTokenConsumidor, senhaHash, { expiresIn: '4h' });

        const { senha: _, ...dadosConsumidor } = consumidor;

        return res.status(200).json({
            consumidor: dadosConsumidor,
            token
        });
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    login
}