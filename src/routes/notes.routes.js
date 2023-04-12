const { Router } = require('express') //Estamos fazendo a importação o express para poder trabalhar as rotas aqui nesse arquivo

const NotesController = require('../controller/NotesController')

const ensureAuthenticatiod = require('../middleware/ensureAuthenticatiod')


const notesRoutes = Router() //Chamamos o Router

const notesController = new NotesController() //estamos estanciando a classe que contém os metodos que vamos precisar

notesRoutes.use(ensureAuthenticatiod)

notesRoutes.get('/', notesController.index)
notesRoutes.post('/', notesController.create)
notesRoutes.get('/:id', notesController.show)
notesRoutes.delete('/:id', notesController.delete)

module.exports = notesRoutes //Aqui estou exportando para chamar lá no server.js

