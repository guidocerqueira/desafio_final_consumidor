const yup = require('./configuracao');

const schemaCadastroItens = yup.object().shape({
    id: yup.number().required('Erro na requisição: produto sem id.'),
    nome: yup.string().required('Erro na requisição: nome de produto não encontrado.'),
    preco: yup.number().required('Erro na requisição: preço inválido').min(1),
    quantidade: yup.number().required('Erro na requisição: quantidade inválida.').min(1),
    url_imagem: yup.string().required('Erro na requisição: Url não encontrada.')
});

module.exports = schemaCadastroItens;
