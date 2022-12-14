
<div align="center">
<h1> Documentação Projeto Node + SQL (Por Abner Santos)</h1>
</div>
 
### 1- Instalar pacote node:

~~~javascript
npm init -y
~~~



## 2- instalar o Express e o nodemon(Para ficar reiniciando a cada atualização do código)

~~~javascript
npm install express nodemon
~~~


## 3- Adicionar o node_module arquivo .gitignore


## 4- criar a pasta src e nela criar o arquivo server.js


## 5- Nesse arquivo importar o express, chamar ele e configurar a porta 
que ele vai rodar

ATENÇÃO: temos que dizer que o express pode trabalhar com Json

EX:
~~~javascript
const express = require('express')

const app = express()

app.use(express.json())  //ATENÇÃO: temos que dizer que o express pode trabalhar com Json


const PORT = 333

app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`))

~~~


## 6- Configurar o script de inicialização do projeto lá no packege-lock.json
ex:


~~~javascript
 "start": "node ./src/server.js"

~~~



## 7- Agora podemos criar as rotas! Mas ates temos que sabe sobre os métodos http


* Get-leitura

* POST-Criação

* PUT-Atualização

* DELETE-Deleção

* PATCH-Atualização Parcial



Exemplo de Inicialização de um server com express: 
~~~javascript
const express = require('express')

const app = express()

app.use(express.json())

app.get('/', (request, response) => {
  response.send('Olá Mundo!!')
})

const PORT = 333

app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`))


~~~


## 8- Sobre Route Params:

É uma estratégia que a gente consegue passar um valor ou informação como parametro!
~~~javascript

app.get('/message/:id', (request, response) => {
  response.send('Olá Mundo!!')
})
~~~

note que temos o /menssagee logo após uma /:id   isso quer dizer que essa rota aceita um parametro


-Podemos também recuperar o parametro que foi passado na requisição! fazendo assim
~~~javascript

app.get('/message/:id', (request, response) => {
  response.send(`Id da mensagem ${request.params.id}`)
})
~~~


Note que usando um template string e dentro pegamos o que vem da requisição pelo parametro!

-Outro exemplo como mais parametros:
~~~javascript

app.get('/message/:id/:user', (request, response) => {
  response.send(`
  ID da mensagem ${request.params.id}.
  Para o usuário ${request.params.user}`)
})
~~~


Resumo dos Params:

Vamos são ultilizados para dados simples, geralmente o request.params é usados 
pra passar ids como dados de um produto, por exemplo podemos criar um rota para que retorna dados de um 
produto!




## 9- Query Params!

Vamos ver a estrutura: 
![Captura de tela 2022-11-11 213011](https://user-images.githubusercontent.com/107922389/201447510-a0106fce-53c8-40a3-8fb9-d097ccf7add1.png)

A interrogação '?' Sinaliza que o que vem depois dela é um Query Params, depois na interrogação
vem o nome e depois do nome temos o sinal de igual(atribuição =) para atribuir um valor para a query e logo após passamos o valor que queremos.

Se quisermos adicionar mais querys usamos o sinal de & e seguimos passando (Exemplo na imagem a cima)

Vamos ver um exemplo no código de um Query params:
~~~javascript


app.get('/user', (request, reponse) =>{

const {page,limit} = request.query


} )
~~~



Vamos entender a diferença dele para o router params:

No router precisamos de todos os parametros, eles não são opcionais!
No Query não são obrigado!



## 10- Agora você deve configurar o Postman e adicionar a URL que está rodando o express, 
logo depois vamos configurar as rotas que vamos usar na aplicação



## 11- vamos ver um exemplo:
~~~javascript

app.post('/uses', (request, reponse) => {
  const { name, email, password } = request.body
  reponse.json({ name, email, password })
})

~~~




## 12- Agora vamos organizar nosso projeto, e vamos usar uma estrutura para isso, veja na imagem a baixo:

![Captura de tela 2022-11-11 223917](https://user-images.githubusercontent.com/107922389/201450633-6ee32c90-2412-4240-a91b-7e60b48d4bbf.png)




## 13- Agora devemos criar uma pasta no src chamada routes e dentro dela um um arquivo chamado user.routes.js
vamos fazer isso para dividir as responsabilidades, então aqui vamos colocar as rotas.


## 14-Maaaaaasss tem um porém, temos que lembrar do arquivo app que não existe no routes, então vamos fazer assim:

~~~javascript


const { Router } = require('express') //Estamos fazendo a importação o express para poder trabalhar as rotas aqui nesse arquivo

const userRoutes = Router() //Chamamos o Router

userRoutes.post('/uses', (request, reponse) => {
  const { name, email, password } = request.body
  reponse.json({ name, email, password })
})

module.exports = userRoutes //Aqui estou exportando para chamar lá no server.js

~~~



## 15- Agora Para organizar mais ainda, vamos criar um arquivo index.js dentro da pasta router, para poder 
centralizar todas as rotas e poder chamar apenas um único arquivo no no serve.js

No server.js vamos chamar um arquivo, e esse arquivo vai chamar a pasta router que nela contém um index
e esse index na pasta router vai ser o arquivo que vai conter todas as chamadas das rotas vamos ver um 
Exemplo do arquivo index na pasta routes:


~~~javascript

//A missão desse index é reunir todas as rotas da aplicação! pra não ficar jogando tudo no server.js
const { Router } = require('express')

//Rota de usuarios//
const userRoutes = require('./users.routes')
 
const routes = Router() //Nosso arquivo princiapl, é o que vamos exportar

routes.use('/users', userRoutes)

module.exports = routes //o outes vai ser o arquivo principal para exportar para o server.js

~~~


## 16- Dentro da pasta routes temos o arquivo user.routes.js e ele vai ficar assim:
~~~javascript

const { Router } = require('express') //Estamos fazendo a importação o express para poder trabalhar as rotas aqui nesse arquivo

const userRoutes = Router() //Chamamos o Router

userRoutes.post('/', (request, reponse) => {
  const { name, email, password } = request.body
  reponse.json({ name, email, password })
})

module.exports = userRoutes //Aqui estou exportando para chamar lá no server.js

~~~



## 17- Agora vamos adicionar o nosso Controller!

O controller podemos dizer que ele é a a parte responsavél por processar as nossas requisições, 
podemos dizer também que ele é a parte inteligente da nossa aplicação, é a camada que vai de fato executar oq o usuario solicitou




## 18- Agora vamos criar uma pasta chamada Controller e dentro dela criar uma classe para poder
colocar os métodos que vamos precisar, segue a lista a baixo!

* // index - GET para listar vários registros
* // show - GET para listar um registro em especifico
* // create - POST para criar um registro.
* // update - PUT para atualizar um registro
* // delete - DELETE para remover um registro

veja o exemplo de como fica:
~~~javascript

class UserController {
  create(request, response) {
    const { name, email, password } = request.body
    reponse.json({ name, email, password })
  }
}

module.exports = UserController

~~~


Essa desestruturação e o response.json nós pegamos do arquivo 	que estava no user.routes, então 
temos que ir lá e chamar anossa classe principal para que o metodo da rota possa enchergar.
no arquivo user.routes vamos chamar assim:

~~~javascript

const userController = new UserController() //estamos estanciando a classe que contém os metodos que vamos precisar

userRoutes.post('/', userController.create)

~~~




## 19- Agora vamos Ultilizar os Meddleware!

Eles é um função que vai agir como um "segurança" que intercepta tudo que for passado na requisição,
ele tem acesso e sabe pra onde a requisição está indo





## 20- Tratamento de Erros e exeções! vamos criar um arquivo padrão para o nosso tratamento de exeções!

dentro da pasta src vamos criar uma pasta utils, e dentro dessa pasta o arquivo chamado

AppError.js

Aqui vamos padronizar qualquer tipo de exeção que aparecer, a baixo um exemplo de como vai ficar

~~~javascript

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

~~~


Agora vamos chamar esse app error lá no nosso controler
~~~javascript

const AppError = require('../utils/AppError')
~~~





## 21- Vamos instalar uma biblioteca do express para poder nos ajudar nmos tratamentos nos error
~~~javascript

npm install express-async-error
~~~

vamos chama-la no script server.js veja o exemplo 
~~~javascript


require('express-async-error')
~~~


### Note que ela só precisa do require pra ser chamada, e ela tem que ficar no topo do escopo do bloco!!


ATENÇÃO: Temos que chamar no script principal o AppError também!!

~~~javascript

const AppError = require('./utils/AppError')

~~~

Próximo passo é fazer uma configuração para usar tudo isso, vamos ver como vai ficar:

~~~javascript

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

  //Se não for um errro do lado do cliente e sim do servidor faremos assim:
  return response.status(500).json({
    status: 'error',
    message: error.message
  })
})
~~~

<div align="center">
<h1> SQL</h1>
</div>





<div align="center">

SQL não é um banco de dados! SQL é uma Linguagem padrão de Banco de dados, e significa: Línguagem de consulta Estruturada

Temos os Grupos de comandos SQL DDL (Data Definition Language) que são:

* CREATE -Para criar tabela
* DROP - Para deletar uma tabela
* ALTER - Para atualizar informações da tabela




![Captura de tela 2022-11-12 170831](https://user-images.githubusercontent.com/107922389/201492632-b14643f3-8081-4b7b-a22f-dcad92385d20.png)


E também podemos ter tabelas que conversão entre si, no caso elas se RELACIONAM


![Captura de tela 2022-11-12 171123](https://user-images.githubusercontent.com/107922389/201492710-4112b3bf-5da3-4425-85ee-eb1932bad4c7.png)
</div>

* A ligação na imagem é o relacionamento das tabelas chamado de CHAVE PRIMARIA!

* Temos tambem a CARDIALIDADE, significa a frequencia que uma tabela se comunica com a outra (noque quele simbolo que parece um pé de galinha na foto que eu coloquei)
isso quer dizer que: um Usuario poder ter varias notas, mas varias notas podem ter só mente um único usuarios

1- No nosso banco de dados vamos usar o SQLite, para instalar vamos usar o seguinte comando:

npm install sqlite3 sqlite --save

2- Vamos criar uma pasta dentro de src chamada database e dentro dela outra pasta chamada sqlite e dentro dela um index.js

Passo 1 
const sqlite3 = require('sqlite3')
const sqlite3 = require('sqlite')
const path = require('path') // É uma biblioteca do proprio node que facilita nossa navegação quando formos usar o filename


Passo 2 criar a função assincrona

//Estamos usando uma função assincrona pois estamos trabalhando com banco de dados, e sabemos que com bancos de dados temos um tempo pra esperar uma resposta
async function sqliteConection(){

//Para abrir uma conexão usando o sqlite.open e dentro vamos passa um objeto com as configurações

  const database = await sqlite.opne({ 
    //O filename vamos dizer onde queremos salvar o nossso arquivo
     filename: path.resolve(__dirname, '..', 'database.db')// Aqui estamos dizendo que queremos criar esse arquivo independete do sistema de navegação do sistema operacional!

  })

}


3- Temos que adicionar o DRIVER que vamos ultilizar que é o SQLite3 vamos colocar depois do filename, vai ficar assim toda a função pronta:

const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
const path = require('path') // É uma biblioteca do proprio node que facilita nossa navegação quando formos usar o filename

//Estamos usando uma função assincrona pois estamos trabalhando com banco de dados, e sabemos que com bancos de dados temos um tempo pra esperar uma resposta
async function sqliteConection() {
  const database = await sqlite.opne({
    //Para abrir uma conexão usando o sqlite.open e dentro vamos passa um objeto com as configurações
    //O filename vamos dizer onde queremos salvar o nossso arquivo
    filename: path.resolve(__dirname, '..', 'database.db'),
    driver: sqlite3.Database
  })
}

module.exports = sqliteConection




4- Agora vamos no server.js temos que importar o arquivo database

const database = require('./database/sqlite')


5- Depois no arquivo server.js depois das rotas vamos executar o banco assim:

database()


6- Fazendo isso, temos que verificar se foi criado um arquivo database.db foi criado dentro da pasta database, se der tudo certo ele vai ser criado!

7-Pra gente poder visualizar esse arquivo sem ser pelo vscode, podemos usar um SGBD 

> SGBD - Que é um sistema geranciador de banco de dados!

Ele é uma ferramente que nos ajuda com as seguintes coisas
* Visualizar o que tem dentro do banco!
* Incluir registros
* Deletar
* Ver estrutura

No nosso projeto vamos usar o BeeKeeper!

ATENÇÃO: Entidades é a mesma coisa de tabelass!

8- No beeKeeper vamos criar nossas tabelas, mas temos que ter em mente as seguintes coisas:

* Nomes de comandos SQL vamos digitar em caixa alta 
* Nomes que nós atribuimos vamos dar em caixa baixa


Comando por exemplo id INTEGER PRIMARY KEY AUTOINCREMENTE estou dizendo que é um campo primario, significa que isso é uma chave e nunca dentro da mesma tabela eu vou ter usuarios com a mesma chave! podemos usar de exemplo o CPF eles são unicos!

O autoincremente vai criar automaticamente ids de acordo com a necessidade da tabela de forma automatica!

vamos ver um exemplo a baixo de uma tabela qu criamos no nosso projeto:

CRIANDO TABELA:

![Captura de tela 2022-11-12 193629](https://user-images.githubusercontent.com/107922389/201497232-831c5676-41ee-42ac-af23-e0d4c6f9ef51.png)

Legenda:

* VARCHAR = Campo requerido
* NULL =  Campo começa vazio
* TIMESTAMP_DEFAULT CURRENT_TIMESTAMP = Significa que o proprio sistema vai criar de forma automatica o registro do campo que for passsado essa linha de comando geralmente de Update e criação.

RENOMEANDO TABELA:

![Captura de tela 2022-11-12 195605](https://user-images.githubusercontent.com/107922389/201497751-5b002e1f-3cf2-448e-969b-fbe30cf9156d.png)

* Vermelho : Nome da tabela que você quer renomear
* Azul: Novo Nome 

ADICIONANDO NOVA COLUNA:

![Captura de tela 2022-11-12 200900](https://user-images.githubusercontent.com/107922389/201498068-170e478a-df90-4ce6-a668-46af70b3eb15.png)

*Na linha de baixo estamos dizendo o nome da nova coluna e se ela é requerida!


RENOMENDO COLUNA:

![Captura de tela 2022-11-12 201253](https://user-images.githubusercontent.com/107922389/201498169-15bfe4d4-6c2b-4351-851c-373ee03c1fc0.png)

DELETANDO COLUNA:

![Captura de tela 2022-11-12 201606](https://user-images.githubusercontent.com/107922389/201498280-50db1334-6a31-4323-9fdd-ba5c1bc2547f.png)



9- Agora vamos automatizar a criação das nossas tabelas!

Vamos criar uma pasta dentro da pasta Sqlite, com o nome  de migrations

dentro da migrations vamos criar um arquivo chamado createIsers.js e e index. dentro de cada arquivo vamos ter ao seguinte codigo
 
 
 INDEX.JS:

const sqliteConnection = require('../../sqlite')

const createUsers = require('./createUsers.js')

async function migrationsRun() {
  const schemas = [createUsers].join('')

  sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error))
}

module.exports = migrationsRun


CREATE USERS.JS:


//Essa parte aqui é oq eu teria que colocar lá no SGBD(beekeper) para criar uma tabela, ai no caso estou automatizando através desse arquivo

const createUsers = `
CREATE TABLE IF NOT EXISTS users ( 
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR,
  email VARCHAR,
  password VARCHAR,
  avatar VARCHAR NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
  `

module.exports = createUsers

//CREATE TABLE IF NOT EXISTS users -> Estou dizendo que só quero que a tabela seja criada se não existir nenhumc om esse nome, fazendo isso evita conflito



ATENÇÃO!!! depois que fizer isso temos que ir lá no nosso arquivo principal server.js e mudar a importação do banco de dados!
 
 
 lá nos colocamos assim:
 const database = require('./database/sqlite')

 e chamamos assim:

 database()


 Agora vai ficar assim: 

 const migrationsRun = require('./database/sqlite/migrations')

 e chamamos assim:

 migrationsRun()



10- Proximo passo é irmos no nosso controller para fazer a conexão com o banco de criar  tudo diretamente no banco! o controler vai ficar assim, já com a função de criar usuario!


const sqliteConection = require('../database/sqlite')
const AppError = require('../utils/AppError')

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body

    const database = await sqliteConection()
    //Vamos verificar se o usuario já existe, isso diretamente  com o banco
    const checkUserExists = await database.get(
      'SELECT * FROM users WHERE  email = (?)',
      [email]
    ) // Aqui estou dizendo: Liste todos os usuarios quem tem um email iguais ao email passado na variavel dentro do vetor [email]

    if (checkUserExists) {
      throw new AppError('este email já está em uso.')
    }
    //Criando usuario, aqui estou dizendo que quero inserir na tabela user, o nome email e password// As interrogações são informanado quantos valores eu quero informar e dentro do vetor digo quais são esses valores (são informações que eu trago lá da constante no topo do escopo dessa função)
    await database.run(
      'INSERT INTO users (name, email, password) VALUES (?,?,?)',
      [name, email, password]
    )

    return response.status(201).json()
  }
}

module.exports = UserController



11- Agora vamos criptografar as senhas, para que elas não sejam visiveis pra quem está vendo o banco!
Para isso vamos instalar o bcryptjs!

npm install bcryptjs

Depois de instalado vamos no nosso controler e e no topo importamos no hash  que é a função que vai gerra a criptografia! vai ficar assim

const {hash} = require('bcryptjs')


proximo passo é criar uma variavel dentro da função que se vai usar o bcrypt e nela vamos fazer assim:

 const hashedPassword = await hash(password , 8)

 Note que temos dois parametros, o primeiro é a senha em si (que recebemos do usuario) e o segundo é o nivel de complexidade!

 logo depois temos que pegar essa variavel e e colocar ela no lugar no password onde fica !

A função que receber a variavel vaii ficar assim
  await database.run(
      'INSERT INTO users (name, email, password) VALUES (?,?,?)',
      [name, email, hashedPassword]
    )




12- Agora vamos criar a rota para ATUALIZAR o usuario!
a Função vai ficar assim:

  async update(request, response) {
    const { name, email } = request.body
    const { id } = request.params

    const database = await sqliteConection()
    //=============VERIFICAÇÃO-1=============================//

    //-1--Aqui estou buscando no banco o id que o usuario está tentando atualizar
    const user = await database.get('SELECT * FROM user WHERE  id = (?)', [id])
    // Aqui estou verificando se o usuario que a pessoa tentou atualizar existe no banco
    if (!user) {
      throw new AppError('Usúario não encontrado')
    }

    //=============VERIFICAÇÃO-2=============================//

    //--2--Aqui estou verificando se ele está tentando atualizar o email dele para um outro email já cadastrado no banco de dados!
    //SELECT * FROM users WHERE email = (?)', [email] ==> Vai buscar em todos os campos da minha tabela de usuarios, onde o email seja igual ao [email] recebido como parametro
    const userWithUpdateEmail = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    )

    //=============VERIFICAÇÃO-3=============================//
    //--3--Estou dizendo: Se ele econtrar um email e se esse email for diferente do id do mesmo, isso significa que ele está tentando mudar o email para um que ja existe!

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError('Esté email já está em uso!')
    }

    //=============AGORA PODEMOS ATUALIZAR=============================//
~~~javascript
    user.name = name
    user.email = email

    await database.run(
      `
      UPDATE users SET
      name=?,
      email=?,
      updated_at=?
      WHERE id=?`,
      [user.name, user.email, new Date(), id]
    )


     return response.json({ message: 'Usuário Atualizado com sucesso' })
  
~~~



  ATENÇÃO: para pegar essa função, temos que ir lá no user.routes e acrescentar a nova rota para deixar visivel para aplicação! vai ficar assim:

~~~javascript
userRoutes.put('/:id', userController.update)
~~~


13- Agora vamos atualizar a senha, para isso vamos usar a lógica de uma condição: Para atualizar a nha para uma senha nova vamos ter quer colocar a antiga!


Exemplo de estrutura do Json:
~~~javascript
{
    "name": "Ana Karla",
    "email": "Ana@hotmail.com",
    "password": "5685457865",
    "old_password": "15454523"
}

~~~


- Agora vamos no Update e dentro dele modificar o que estou recebendo da requisição:
está assim:
~~~javascript
const { name, email } = request.body
~~~
vai ficar assim:
~~~javascript
const { name, email ,  } = request.body
~~~

-E vamos criar um if para fazer uma validação

~~~javascript
   if (password && !old_password) {
      throw new AppError(
        'Você precisar digitar a senha antiga para definir a nova senha'
      )
    }

~~~


14- Agora Temos que verificar se a senha antiga informada é igual a senha antiga do banco de dados, se forem iguais vamos deixar entrar no if e o codiog vai rodar.

- Para isso vamos importar o compare, vamos usar ele junto com o hash lá no topo do código, vai ficar assim:

const { hash , compare } = require('bcryptjs')



-Agora vamos fazer um if para comparar as senhas antigas, se forem iguais podemos autorizar

~~~javascript
    //Aqui estou comparando a senha antiga digitada com a senha antiga do banco de dados, elas tem que ser iguais para eu autorizar a troca de senha.
    if (password && old_password) {
      const checkOld_password = await compar(old_password, password)

      if (!checkOld_password) {
        //Aqui estou checando se as senhas são diferentes se forem vai entrar nesse if e cuspír esse error
        throw new AppError('A senha antiga não confere')
      }

      //se tudo der certo, vamos atribuir a nova senha já criptografada
      user.password = await hash(password, 8)
    }
~~~

- Vamos atualizar também a minha model do banco de dados, adicionando o password e dentro do array o user.password. Vai ficar assim:

~~~javascript
 await database.run(
      `
      UPDATE users SET
      name=?,
      email=?,
      password=?,
      updated_at=?
      WHERE id=?`,
      [user.name, user.email, user.password, new Date(), id]
    )
~~~





























