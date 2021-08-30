# cubos-food

## MODELAGEM DO BANCO DE DADOS

**Uma regra importante:** cada usuário poderá comprar de n restaurantes e cada restaurante deverá ter apenas 1 usuário associado às compras, portanto um relacionamento de 1 para n.

Estas tabelas deverão ser:
* Consumidor

### CONSUMIDOR

Tabela para armazenar os dados e credenciais das pessoas que poderão acessar o dashboard.

| Coluna     | Tipo         | NOT NULL? | PK? | REFERENCES | DEFAULT   |
| --------   | --------     | --------- | --- | ---------- | -------   |
| id         | SERIAL       | Sim       | Sim |            |           |
| nome       | varchar(100) | Sim       |     |            |           |
| email      | varchar(100) | Sim       |     |            |           |
| senha      | text         | Sim       |     |            |           |
| telefone   | text         | Sim       |     |            |           |

## ENDPOINTS DA API

### POST /consumidor

Endpoint para atender a funcionalidade de criar um novo usuário para o dashboard. Ele deverá receber tanto os dados do usuário através de objeto JSON no corpo da requisição no formato abaixo.


### POST /login

Endpoint para realização de login dos usuários no dashboard, de forma que realize:
* A validação das credenciais do usuário (e-mail e senha), retornando mensagens adequadas quando as credenciais não forem válidas
* A autenticação dos usuários, gerando e retornando token válido como resposta