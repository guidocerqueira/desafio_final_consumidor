/* CRIAÇÃO DO DB */
CREATE DATABASE desafio_final;

/* CRIAÇÃO DAS TABELAS */
DROP TABLE IF EXISTS consumidor;

CREATE TABLE consumidor (
  id serial NOT NULL PRIMARY KEY,
  nome varchar(100) NOT NULL,
  email varchar(100) NOT NULl UNIQUE,
  senha text NOT NULL,
  telefone text NOT NULL
);

DROP TABLE IF EXISTS endereco;

CREATE TABLE endereco (
  id serial NOT NULL PRIMARY KEY,
  consumidor_id integer NOT NULL,
  cep varchar(8) NOT NULL,
  endereco varchar(100) NOT NULl,
  complemento varchar(100),
  FOREIGN KEY (consumidor_id) REFERENCES consumidor (id)
);

DROP TABLE IF EXISTS pedidos;

CREATE TABLE pedidos (
  id serial NOT NULL PRIMARY KEY,
  consumidor_id integer NOT NULL,
  restaurante_id integer NOT NULL,
  endereco_id integer NOT NULL,
  subtotal integer NOT NULL,
  taxa integer DEFAULT 0,
  total integer NOT NULL,
  enviado boolean DEFAULT FALSE,
  entregue boolean DEFAULT FALSE,
  FOREIGN KEY (consumidor_id) REFERENCES consumidor (id),
  FOREIGN KEY (restaurante_id) REFERENCES restaurantes (id),
  FOREIGN KEY (endereco_id) REFERENCES endereco (id)
);

DROP TABLE IF EXISTS itens;

CREATE TABLE itens (
  id serial NOT NULL PRIMARY KEY,
  pedidos_id integer NOT NULL,
  produto_id integer NOT NULL,
  nome varchar(100) NOT NULl,
  preco integer NOT NULL,
  quantidade integer NOT NULL,
  url_imagem varchar(255),
  FOREIGN KEY (pedidos_id) REFERENCES pedidos (id),
  FOREIGN KEY (produto_id) REFERENCES produtos (id)
);