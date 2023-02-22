
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
      const checkOld_password = await compar(old_password, user.password)

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


15-ATENÇÃO!!! Vamos fazer um ajuste!!!!

Na estrutura dos dados para o banco, vamos retirar o new Date() e fazer com que o proprio banco fique resposavel por regiostrar as horas que o registro foi atualizado!

A nova estrutura vai ficar assim:
~~~javascript
   await database.run(
      `
      UPDATE users SET
      name=?,
      email=?,
      password=?,
      updated_at= DATETIME('now')
      WHERE id=?`,
      [user.name, user.email, user.password, id]
    )
~~~

O datetime('now') vai ser atualizado por uma função que existe lá dentreo do banco.
o banco de dado tem funções também!!

16- Agora vamos fazer uma validação usando o nullish operator em resumo: ou é um ou é outro!

//Aqui estou dizendo: Se tem conteudo no primeiro parametro, coloca ele, se não tiver coloca o do segundo, estou fazendo isso para quandoneu redefinir a senha, mesmo colocando o campo nome e emailm vazio ele ser preenchido automaticamente!

~~~javascript
    user.name = name ?? user.name
    user.email = email ?? user.email

  ~~~




17- ######=====SQL Query Builder====#####

É um construtor de consulta!

Ele permite que a gente gere instruções SQL, independete do Banco de dados que nós estamos ultilizando!

Os banco de dados relacionais eles ultilizam um mesmo padrão de linguagem de conulta que é o SQL, mas podem ter algumas diferenças de um banco para o outro, por exemplo:

No MySql o ponto e virula é Obrigatório no SQLserver não.

Se estamos trabalhando com um banco e por algum motivo mudamos esse banco, podemos ter um problema!

Ai que entra a Query Builder:

Ele nos permite gerar códigos SQL independete do banco!


como funciona???

Ao inves de escrever meu código SQl especifico pro banco eu vou escrever utilizando a query builder, então eu vou usar a sintax do query builder, ele vai gerar o código SQL pro banco de dados que eu pedir para ele gerar


18- Para trabalhar com Query builder vamos usar o Knex.js

Ele é uma query builder!

-Para instalar usaremos o comando:

npm install knex --save


Agora vamos fazer as configurações dele!

-Rodando o comando:

npx knex init


-vai ser gerado um arquivo .js na raiz do projeto.

Vamos configura-lo assim:

~~~javascript
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

~~~


19- Agora vamos criar um uma pasta dentro de SRC chamada Knex e de dentro um index.js nela vamos fazer algumas configurações.
nesse arquivo vai ficar assim:

~~~javascript
const config = require('../../../kenxfile')

const knex = require('knex')

const connection = knex(config.development)

module.exports = connection

~~~


20- Migrations:  é uma forma de versionar a base de dados, trabalha na manipulação da base de dados: criando,alterando ou removendo isso para o banco de dados!

Ao inves de criar uma tabela manualmente,alterar ou remover podemos usar a migration para fazer isso pra gente!

temos dois métodos:

UP: Ele cria ou aletar algo no banco de dados

DOWN: responsável pelo rollback. Ou seja, desfazer as alterações realizadas pela migration


21- Agora com o knexfiles.js vamos implementarv estrategia de migrations para automastizar a criação de tabelas na aplicação

1- Vamos monstrar ao knexfile o lugar que ele vai armazenar as informações

2- depois do connection vamos fazer essa configuração, veja abaixo como vai ficar

~~~javascript
  migrations:{
      directory: path.resolve(__dirname,"src", "database", "knex", "migrations")
    },

~~~



22- Agora vamos chamar o knex no nosso terminal e ele vai criar a tabela de forma automatica.


~~~javascript
npx knex migrate:make createNotes
~~~

23- Vai gerar uma pasta no directorio que foi configurado no migration e dentro dela um arquivo dentro desse arquivo é que vai ficar as configurações, e esse arquivo tem que está asim:



~~~javascript
exports.up = knex =>
  knex.schema.createTable('notes', table => {
    table.increments('id')
    table.text('title')
    table.text('descriptions')
    //Abaixo estou dizendo que quero criar um campo do tipo inteiro na minha tabela, chamado user_id e que ele faz referencia ao id que existe dentro da tavbela usuario, resumindo: só vai criar uma nota se existir um usuario.
    table.integer('user_id').references('id').inTable('users')

    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
  })

exports.down = knex => knex.schema.downTable('notes')


~~~


24- vamos agora rodar essa migration par ver se está funcionando usando o seguinte comando:

~~~javascript

npx knex migrate:latest
~~~

Se pegar lá no beekeeper vai ser gerado umas pastas!


25- agoras temos que criar um script para poder estartar essas tabelas sem precisar ficar dando esse comando enorme, então vamos fazer assim:

package.Json > scripts 

lá vamos criar um assim:

~~~javascript
"migrate": "knex migrate:latest"
~~~


e para rodar ela no terminal vamos fazer assim:

~~~javascript
npm run migrate

~~~


##### NPM X NPX ###

-Npm: Gerenciador de pacote padrão do node.

Npx: Node Package Execute e vem com npm acima da versão 5.2, ele é um executor de pacotes npm que pode executar qualquer pacote np´m sem precisar instalar o mesmo



###### Primary key X Foreign Key ######

-Chave primaira: 
 é o identificador unico dentro da tabela, o objetivo dela é indetificar os registro para cada um ter seu proprio identificador,  a BASE de uma chave primeria é garanbtir que esse valor não se repita!


-chave estrangeira:
É uma chave que vem de outra tabela, ela tem o objetivo e a ultilidade de conectar Tabelas! Ela indica que na tabela atual tem uma outra chave que veio de outra tabela, e ela identifica mostrando de onde veio.


###### Cardinalidade ######

É a frequencia com que uma tabela se comunica com a outra!

prestar atenção nos graficos que ligam as tabelas, ex: pe de galinha.



26- Agora vamos criar as tabelas do que vamos precisar, já criamos as das Notas agora vamos criar a das tags!

Com o comando:

npx knex migrate:make createTages

Vamos ver cmo vai ficar nosso migration createTags

~~~javascript
exports.up = knex =>
  knex.schema.createTable('tags', table => {
    table.increments('id')
    table.text('name').notNullable()

    //A baixo estou dizendo que o id note ta vendo da tabela de notes, e coloquei o onDelete("CASCADE") que significa: Se eu deletar a nota que essa tag está veiculada automaticamente e vai ser deletada também. Para quando as notas forem excluidas não ficar cheio de tags desnecessaris no banco.
    table
      .integer('note_id')
      .references('id')
      .inTable('notes')
      .onDelete('CASCADE')

    table.integer('user_id').references('id').inTable('users')
  })

exports.down = knex => knex.schema.downTable('tags')

~~~


27- Agora vamos criar as dos Linkes!

npx knex migrate:make createLinks

e o arquivo js vai ficar assim:

~~~javascript
exports.up = knex =>
  knex.schema.createTable('links', table => {
    table.increments('id')
    table.text('url').notNullable()

    
    table
      .integer('note_id')
      .references('id')
      .inTable('notes')
      .onDelete('CASCADE')
    table.timestamp('created_at').default(knex.fn.now())
  })

exports.down = knex => knex.schema.downTable('links')

~~~


Agora vamos rodar tudo!

npm run migrate



28- Vamos no nosso SGBD e verificar se foi criada as tabelas e se elas estão ligadas entre si.



29- Por padrão no sqlite a funcionalidade de apagar em cascata ela é desabilitada por padrão, então vamos fazer assim.

-Ir no nosso arquivo knexfile.js e vamos colocar a baixo de connection o seguinte código.


~~~javascript
 pool: {
      //Aqui estou habilitanbdo a funcionalidade de quando eu apagar uma nota, também sem excluido também as tags e tudo relacionado aquela nota que está em outro banco.
      afterCreate: (conn, cb) => conn.run('PRAGMA foreing_keys = ON', cb)
    }

~~~


Todo o código vai ficar assim:

~~~javascript
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


~~~


30- Agora vamos criar no postman a estrutura json com os dados para as notas!

temos que colocar tudo oq esperamos receber no banco:


{
   "title": "Introdução ao NodeJs",
   "description": "Essa é uma nota de exemplo",
   "tags": ["node","express"],
   "links": ["link1","link2"]
}




31- Agora para nossa aplicação vamos criar um controler ( o que criamos foi de usuario).

vamos na poasta controller e vamos criar um arquivo chamado:

NotesController.js


1- Dentro dele temos que importar o knex!

e vai ficaar assim:

~~~javascript
const knex = require('../database/knex')

class NotesController {
  async create(request, respose) {
    //estou pegando os dados que vem do postman (do corpo da requisição)
    const { title, description, tags, links } = request.body
    const { user_id } = request.params

    const note_id = await knex('notes').insert({ title, description, user_id })

    const linksInsert = links.map(link => {
      return {
        note_id,
        url: link
      }
    })

    await knex('link').insert(linksInsert)

    //////VAMOS FAZER A MESMA COISA COM AS TAGS////////

    const tagsInsert = links.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    })
    await knex('tags').insert(tagsInsert)

    respose.json()
  }
}

module.exports = NotesController

~~~






32- Agora criar as rotas para ele, para isso vamos lá em routes e vamos criar um arquivo chamado

notes.routes.js

e dentro dele vai ficar assim:

~~~javascript

const { Router } = require('express') //Estamos fazendo a importação o express para poder trabalhar as rotas aqui nesse arquivo

const NotesController = require('../controller/NotesController')

const notesRoutes = Router() //Chamamos o Router

const notesController = new NotesController() //estamos estanciando a classe que contém os metodos que vamos precisar

notesRoutes.post('/:user_id', notesController.create).

module.exports = notesRoutes //Aqui estou exportando para chamar lá no server.jss


~~~



## 34 - Proximo passo é criar a estrutura no postman também adicionando o link da rota

Vai ser uma resquisição do tipo POST com o body assim:

~~~javascript
{
    "title": "Nota Criada Na Madrugada",
    "descriptions": "madrugada",
    "tags": ["node","express"],
    "links": ["link6", "link7"]
}

~~~

E o link no postman vai ser o localhorst/notes/id

- lá no script vamos em NotesControllers e montar o códidigo:

vai ficar assim:

~~~javascript
  //Aqui vamos criar a função de exibir as notas
  async show(request, respose){

    const {id} = request.params;

    //para selecionar as notas baseadas no id vamos isar o filtro where

    const note =await knex("notes").where({id}).first() //o first estou dizendo que quero a primeira
    
    return response.json(note)  //lembrar de acrescentar no arquivo de notas o notes.routes
  }
~~~

Agora dentro da  pasta routes no index vamos chamar essa função

routes.use('/notes', notesRoutes)

e dentro do arquivo notes.routes.js:

notesRoutes.get('/:id', notesController.show)

o mesmo vamos fazer com as tags, links e etc

A função de leitura no final vai ficar assim:

~~~javascript
  //Aqui vamos criar a função de exibir as notas
  async show(request, response){

    const {id} = request.params;
    console.log('chegou aqui no show');
    //para selecionar as notas baseadas no id vamos isar o filtro where

    const note = await knex("notes").where({id}).first(); //o first estou dizendo que quero a primeira
    const tags = await knex('tags').where({note_id:id}).orderBy('name')
    const links = await knex('links').where({note_id: id}).orderBy("created_at")
    
    return response.json({
     ...note,
     tags,
     links

    });  //lembrar de acrescentar no arquivo de notas o notes.routes
  }

  ~~~



## 35 - Agora vamos criar a rota de delete, em NotesController vamos repetir os mesmos processos dos demais, primeira criar a função:

~~~javascript

 //Aqui vamos criar a função para Deletar as notas

  async delete (request, response){

  //Para fazer a funcionalidade de delete vamo pegar o id
  const {id} = request.params;

  await knex('notes').where({id}).delete();

  return response.json();

  }

~~~

## 36 - Agora uma outra para mostrar todas as notas
~~~javascript

  //Função para Mostrar todas as notas

  async index (request , response){

    const {user_id} = request.query;
    const notes = await knex ('notes').where({user_id}).orderBy("title");
    return response.json(notes)
    //utilizamos o orderBy para poder colocar em rodem alfabetica.
  }
~~~

 e lá no notes.routes.js  vamos colocar assim:

~~~javascript
 notesRoutes.get('/', notesController.index)
~~~
  
Vamos no postman e add uma nova query desse modo:

key: user_id  com value: 2

## Porém vamos reformular isso, vamos ter que também adicionar uma condição de pesquisa por titulo, agora o código vai ficar assim, reformulado:


~~~javascript
 async index (request , response){

    const {title,user_id} = request.query;
    //Aqui estou usando o operador whereLike ele nos ajuda buscar valores que contenham dentro de uma palavra, no primeiro parametro é o campo que
    //Quero usar e logo após coloco a variavel com percentual essa variavel ela diz ao banco de dados que queremos fazer busca tenato antes quanto depois.
    //isso vai nos permitir fazer busca apenas usando palavras ao ives de tetoz completos
    const notes = await knex ("notes").where({user_id}).whereLike("title", `%${title}%`).orderBy("title");
    
    return response.json({notes});
    //add também o title que é um parametro para usar nas buscas
    //utilizamos o orderBy para poder colocar em rodem alfabetica.
  }

~~~

  










