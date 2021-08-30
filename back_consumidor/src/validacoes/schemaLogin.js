const yup = require('./configuracao');

const schemaLogin = yup.object().shape({
    email: yup.string().required('Email ou senha inválidos').email(),
    senha: yup.string().required('Email ou senha inválidos').min(5)
});

module.exports = schemaLogin;