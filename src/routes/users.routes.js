// Importando o módulo Router do Express, que permite criar e manipular rotas
const { Router } = require('express')

// Importando o middleware de autenticação
const ensureAuthenticatiod = require('../middleware/ensureAuthenticatiod')

// Importando o controller de usuário
const UserController = require('../controller/userController')

// Criando um objeto de rotas
const userRoutes = Router()

// Instanciando o controller de usuário
const userController = new UserController()

// Definindo a rota POST para criação de usuário
userRoutes.post('/', userController.create)

// Definindo a rota PUT para atualização de usuário, com o middleware de autenticação
userRoutes.put('/', ensureAuthenticatiod, userController.update)

// Exportando as rotas para serem utilizadas em outro arquivo, neste caso no server.js
module.exports = userRoutes
