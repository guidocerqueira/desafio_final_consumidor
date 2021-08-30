const knex = require('../conexao');
const schemaCadastroItens = require('../validacoes/schemaCadastroItens');
const schemaCadastroPedido = require('../validacoes/schemaCadastroPedido');


const cadastrarPedidos = async (req, res) => {
    let total = 0;
    let subtotal = 0;
    let taxa = 0; 
    const { consumidor } = req;
    const { carrinho, restaurante_id, } = req.body;

    if (!carrinho) {
        return res.status(400).json('Carrinho vazio!');
    }

    try {
        await schemaCadastroPedido.validate(req.body);

        const encontrarEndereco = await knex('endereco').where({ consumidor_id: consumidor.id }).first();
       
        if (!encontrarEndereco) {
            return res.status(404).json('Endereco não foi encontrado.');
        }

        const encontrarRestaurante = await knex('restaurantes').where({ id: restaurante_id }).first();
        
        if (!encontrarRestaurante) {
            return res.status(404).json('O restaurante não existe.');
        }

        taxa = encontrarRestaurante.taxa_entrega

        for (const produto of carrinho) {
            await schemaCadastroItens.validate(produto);

            const conferirProdutos = await knex('produtos')
            .where({ id: produto.id, nome: produto.nome, preco: produto.preco, restaurante_id, ativo: true }).first();

        if (!conferirProdutos) {
            return res.status(404).json('Algo deu errado. Os produtos selecionados não existem!');
        }

        subtotal += (produto.preco * produto.quantidade);
        }

        total = subtotal + taxa;

        const pedido = {
            consumidor_id: consumidor.id,
            restaurante_id: encontrarRestaurante.id,
            endereco_id: encontrarEndereco.id,
            subtotal,
            taxa,
            total
        }

        const pedidoId = await knex('pedidos').insert(pedido).returning('id');

        if (!pedidoId) {
            return res.status(404).json('Pedido não foi cadastrado.');
        }

        for (const produto of carrinho) {
            produto.produto_id = produto.id;
            produto.pedidos_id = pedidoId;

            const inserirItens = await knex('itens').insert(produto);

            if (!inserirItens) {
                return res.status(400).json('Tente novamente mais tarde. Erro no servidor.');
            }

        };

        return res.status(200).json('Pedido Confirmado! Agora é só aguardar o seu pedido');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = cadastrarPedidos;