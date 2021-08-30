const knex = require('../conexao');

const listarRestaurantes = async (req, res) => {
    const { busca } = req.query
    let restaurantes = '';
    try {
        const categorias = await knex('categorias');

        restaurantes = await knex('restaurantes')
            .where('restaurantes.nome', 'ilike', `%${busca}%`);

        restaurantes.map(restaurante => {
            categorias.find(categoria => {
                if (categoria.id === restaurante.categoria_id) {
                    restaurante.categoria = categoria;
                }
            })
        })

        return res.status(200).json(restaurantes);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const listarProdutosRestaurantes = async (req, res) => {
    const { id } = req.params;

    try {
        const produtos = await knex('produtos')
            .where({ restaurante_id: id });

        return res.status(200).json(produtos);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    listarRestaurantes,
    listarProdutosRestaurantes
}