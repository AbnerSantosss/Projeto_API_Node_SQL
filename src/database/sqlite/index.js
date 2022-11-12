const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
const path = require('path') // É uma biblioteca do proprio node que facilita nossa navegação quando formos usar o filename

//Estamos usando uma função assincrona pois estamos trabalhando com banco de dados, e sabemos que com bancos de dados temos um tempo pra esperar uma resposta
async function sqliteConection() {
  const database = await sqlite.open({
    //Para abrir uma conexão usando o sqlite.open e dentro vamos passa um objeto com as configurações
    //O filename vamos dizer onde queremos salvar o nossso arquivo
    filename: path.resolve(__dirname, '..', 'database.db'),
    driver: sqlite3.Database
  })
}

module.exports = sqliteConection
