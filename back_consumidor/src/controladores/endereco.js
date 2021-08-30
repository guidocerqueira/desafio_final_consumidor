const knex = require('../conexao');
const schemaCadastrarEndereco = require('../validacoes/schemaCadastrarEndereco');

const obterEndereco = async (req, res) => {
    const { consumidor } = req;

    try {
        const enderecoConsumidor = await knex('endereco').where({ consumidor_id: consumidor.id }).first();

        if (!enderecoConsumidor) {
            return res.status(404).json('Endereço não foi encontrado.');
        }

        return res.status(200).json(enderecoConsumidor);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const cadastrarEndereco = async (req, res) => {
    const { consumidor } = req;
    const { cep, endereco, complemento } = req.body;

    try {
        await schemaCadastrarEndereco.validate(req.body);

        const cadastrarEndereco = await knex('endereco').insert({ consumidor_id: consumidor.id, cep, endereco, complemento}).returning('*');

        if (!cadastrarEndereco) {
            return res.status(404).json('Algo inesperado aconteceu, tente novamente.');
        }

        return res.status(200).json('Endereço adicionado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    obterEndereco,
    cadastrarEndereco
};