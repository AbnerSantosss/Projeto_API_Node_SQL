//A missão desse index é reunir todas as rotas da aplicação! pra não ficar jogando tudo no server.js
const { Router } = require('express')

//Rota de usuarios//
const userRoutes = require('./users.routes')
const notesRoutes = require('./notes.routes')
const tagsRoutes = require("./tags.routes")
const sessionRoutes = require("./Sessions.routes")

const routes = Router() //Nosso arquivo princiapl, é o que vamos exportar

routes.use('/users', userRoutes)
routes.use('/notes', notesRoutes)
routes.use('/tags', tagsRoutes)
routes.use('/sessions', sessionRoutes)



module.exports = routes //o outes vai ser o arquivo principal para exportar para o server.js
