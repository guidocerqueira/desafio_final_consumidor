const knex = require('../conexao');
const bcrypt = require('bcrypt');
const schemaCadastroConsumidor = require('../validacoes/schemaCadastroConsumidor');

const cadastrarConsumidor = async (req, res) => {
    const { nome, email, senha, telefone } = req.body;

    try {
        await schemaCadastroConsumidor.validate(req.body);

        const verificarEmailConsumidor = await knex('consumidor').where({ email }).first();

        if (verificarEmailConsumidor) {
            return res.status(404).json('Email informado já possui cadastro.');
        }

        const senhaCritptografada = await bcrypt.hash(senha, 10);

        const consumidor = await knex('consumidor').insert({ nome, email, senha: senhaCritptografada, telefone }).returning('*');

        if (!consumidor) {
            return res.status(404).json('Usuário não foi cadastrado');
        }

        return res.status(200).json('Usuário cadastrado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = cadastrarConsumidor;