const path = require('path')

module.exports = {
  development: {
    client: 'sqlite3', //Aqui estamos dizendo qual o tipo de banco de dados
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'database.db') //Aqui fica nossa conexão, estou indicando o lugar que está o nosso banco de dados.
      //ATENÇÃO:Note que estou chamando o path lá em cima, ele vai nos auxiliar na quatão da navegação indipendente do sistema operacional, e no filename ao inves de dizer o caminhão da forma tradicvional eu usei o path.
    },
    useNullAsDefault: true //Uma propriedade padrão para trabalhgar com SQlite
  }
}
