//Um controle pode ter no maximo 5 métodos ( funções e etc..)
// Aqui vamos ver um padrão de controler:

// index - GET para listar vários registros
// show - GET para listar um registro em especifico
// create - POST para criar um registro.
// update - PUT para atualizar um registro
// delete - DELETE para remover um registro

const AppError = require('../utils/AppError')

class UserController {
  create(request, response) {
    const { name, email, password } = request.body

    if (!name) {
      throw new AppError('Nome é obrigatorio')
    }

    response.status(201).json({ name, email, password })
  }
}

module.exports = UserController
