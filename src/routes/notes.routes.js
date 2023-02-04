const { Router } = require('express') //Estamos fazendo a importação o express para poder trabalhar as rotas aqui nesse arquivo

const NotesController = require('../controller/NotesController')

const notesRoutes = Router() //Chamamos o Router

const notesController = new NotesController() //estamos estanciando a classe que contém os metodos que vamos precisar

notesRoutes.post('/:user_id', notesController.create)

module.exports = notesRoutes //Aqui estou exportando para chamar lá no server.js
