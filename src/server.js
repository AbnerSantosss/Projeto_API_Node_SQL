const express = require('express')

const routes = require('./routes') // Aqui estou chamando meu arquivo index, que contem todas as rotas

const app = express()

app.use(express.json())

app.use(routes)

const PORT = 333

app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`))
