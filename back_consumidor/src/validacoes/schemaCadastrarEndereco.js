const yup = require('./configuracao');

const schemaCadastrarEndereco = yup.object().shape({
    cep: yup.string().required('Campo CEP é obrigatório'),
    endereco: yup.string().required('Campo CEP é obrigatório'),
    complemento: yup.string()
})

module.exports = schemaCadastrarEndereco;