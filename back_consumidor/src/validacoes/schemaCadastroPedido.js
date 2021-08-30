const yup = require('./configuracao');

const schemaCadastroPedido = yup.object().shape({
    restaurante_id: yup.number().required('Restaurante não encontrado.'),
});

module.exports = schemaCadastroPedido;