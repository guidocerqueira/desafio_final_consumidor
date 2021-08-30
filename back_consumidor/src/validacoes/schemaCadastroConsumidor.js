const yup = require('./configuracao');

const schemaCadastroConsumidor = yup.object().shape({
    telefone: yup.string().required('Campo telefone é obrigatório.'),
    senha: yup.string().required('Campo senha é obrigatório.').min(5),
    email: yup.string().required('Campo E-mail é obrigatório.').email(),
    nome: yup.string().required('Campo nome é obrigatório.')    
});

module.exports = schemaCadastroConsumidor;