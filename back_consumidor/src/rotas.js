const express = require('express');
const cadastrarConsumidor = require('./controladores/consumidor');
const { listarRestaurantes, listarProdutosRestaurantes } = require('./controladores/restaurantes');
const { login } = require('./controladores/login');
const verificarLogin = require('./filtros/verificarLogin');
const { obterEndereco, cadastrarEndereco } = require('./controladores/endereco');
const cadastrarPedidos = require('./controladores/pedidos');

const rotas = express();

// CADASTRO CONSUMIDOR
rotas.post('/consumidor', cadastrarConsumidor)

// LOGIN
rotas.post('/login', login);

// MIDDLEWARE QUE VERIFICA LOGIN
rotas.use(verificarLogin);

// RESTAURANTES
rotas.get('/restaurantes/:id', listarProdutosRestaurantes);
rotas.get('/restaurantes', listarRestaurantes);

// DADOS PARA CONSUMIDOR E RESTAURANTE
rotas.get('/endereco', obterEndereco);
rotas.post('/endereco', cadastrarEndereco);
rotas.post('/pedido', cadastrarPedidos);



module.exports = rotas;