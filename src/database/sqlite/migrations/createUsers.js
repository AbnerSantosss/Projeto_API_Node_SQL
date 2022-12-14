//Essa parte aqui é oq eu teria que colocar lá no SGBD(beekeper) para criar uma tabela, ai no caso estou automatizando através desse arquivo

const createUsers = `
CREATE TABLE IF NOT EXISTS users ( 
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR,
  email VARCHAR,
  password VARCHAR,
  avatar VARCHAR NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
  `

module.exports = createUsers

//CREATE TABLE IF NOT EXISTS users -> Estou dizendo que só quero que a tabela seja criada se não existir nenhumc om esse nome, fazendo isso evita conflito
