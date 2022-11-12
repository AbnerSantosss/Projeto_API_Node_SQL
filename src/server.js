const express = require('express')

const app = express()

app.use(express.json())

app.get('/message/:id/:user', (request, response) => {
  const { id, user } = request.params // Aqui estou desestruturando da requisição, estou fazendo exatamente request.params.user e request.params.id.

  response.send(`
  ID da mensagem ${id}.
  Para o usuário ${user}.
  `)
})

const PORT = 333

app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`))
