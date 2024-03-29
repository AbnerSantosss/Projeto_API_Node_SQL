require('express-async-errors')
require ('dotenv/config.js')
const migrationsRun = require('./database/sqlite/migrations/index.js')
const AppError = require('./utils/AppError')
const uploadConfig = require('./configs/upload.js')




const cors = require("cors")
const express = require('express')
const routes = require('./routes') // Aqui estou chamando meu arquivo index, que contem todas as rotas

migrationsRun()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes) //Routes que Puxa o index.js da pasta routes

//Tratamento de exeções//
app.use((error, request, response, netx) => {
  //Aqui estou fazendo uma validação usando o instanceof para me saber se o error foi gerado pelo lado do cliente, se for vai entrar no if
  if (error instanceof AppError) {
    //Vai entrar nesse if se for um erro do lado do cliente
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.error(error)
  console.log('passou')

  //Se não for um errro do lado do cliente e sim do servidor faremos assim:
  return response.status(500).json({
    status: 'error',
    message: 'Error interno do servidor'
  })
})
;('')
const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`))
