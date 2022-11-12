class AppError {
  message
  statusCode

  //O metodo construtor ele é carregado toda vez que a classe for estânciada! e aqui estou dizendo que eu quero que toda vez que ele for estânciada, eu quero saber do mensage e do statuscode
  constructor(message, statusCode = 400) {
    this.message = message
    this.statusCode = statusCode
  }
}

module.exports = AppError
