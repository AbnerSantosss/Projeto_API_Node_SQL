const { Router } = require('express') //Estamos fazendo a importação o express para poder trabalhar as rotas aqui nesse arquivo

const userRoutes = Router() //Chamamos o Router

userRoutes.post('/', (request, reponse) => {
  const { name, email, password } = request.body
  reponse.json({ name, email, password })
})

module.exports = userRoutes //Aqui estou exportando para chamar lá no server.js
