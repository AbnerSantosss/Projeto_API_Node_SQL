const { default: knex } = require('knex')
const path = require('path')

module.exports = {
  development: {
    client: 'sqlite3', //Aqui estamos dizendo qual o tipo de banco de dados
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'database.db') //Aqui fica nossa conexão, estou indicando o lugar que está o nosso banco de dados.
      //ATENÇÃO:Note que estou chamando o path lá em cima, ele vai nos auxiliar na quatão da navegação indipendente do sistema operacional, e no filename ao inves de dizer o caminhão da forma tradicvional eu usei o path.
    },
    pool: {
      //Aqui estou habilitanbdo a funcionalidade de quando eu apagar uma nota, também sem excluido também as tags e tudo relacionado aquela nota que está em outro banco.
      afterCreate: (conn, cb) => conn.run('PRAGMA foreing_keys = ON', cb)
    },
    migrations: {
      directory: path.resolve(
        __dirname,
        'src',
        'database',
        'knex',
        'migrations'
      )
    },
    useNullAsDefault: true //Uma propriedade padrão para trabalhgar com SQlite
  }
}
