// Importa a função sqliteConnection do arquivo "sqlite.js"
const sqliteConnection = require('../../sqlite')

// Importa a função createUsers do arquivo "createUsers.js"
const createUsers = require('./createUsers.js')

// Função assíncrona responsável por rodar as migrações do banco de dados
async function migrationsRun() {
// Concatena todas as migrações em um único script
const schemas = [createUsers].join('')

// Conecta com o banco de dados e executa as migrações
sqliteConnection()
.then(db => db.exec(schemas))
.catch(error => console.error(error))
}

// Exporta a função migrationsRun para ser utilizada em outros arquivos
module.exports = migrationsRun