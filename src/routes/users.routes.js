const { Router } = require('express') //Estamos fazendo a importação o express para poder trabalhar as rotas aqui nesse arquivo

const UserController = require('../controller/userController')

const userRoutes = Router() //Chamamos o Router

const userController = new UserController() //estamos estanciando a classe que contém os metodos que vamos precisar

userRoutes.post('/', userController.create)
userRoutes.put('/:id', userController.update)

module.exports = userRoutes //Aqui estou exportando para chamar lá no server.js
