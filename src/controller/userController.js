//Um controle pode ter no maximo 5 métodos ( funções e etc..)
// Aqui vamos ver um padrão de controler:

// index - GET para listar vários registros
// show - GET para listar um registro em especifico
// create - POST para criar um registro.
// update - PUT para atualizar um registro
// delete - DELETE para remover um registro

const { hash, compare } = require('bcryptjs')
const AppError = require('../utils/AppError')
const sqliteConection = require('../database/sqlite')
const { application } = require('express')

class UserController {
  //Criar usuario
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

    const hashedPassword = await hash(password, 8)
    //Criando usuario, aqui estou dizendo que quero inserir na tabela user, o nome email e password// As interrogações são informanado quantos valores eu quero informar e dentro do vetor digo quais são esses valores (são informações que eu trago lá da constante no topo do escopo dessa função)
    await database.run(
      'INSERT INTO users (name, email, password) VALUES (?,?,?)',
      [name, email, hashedPassword]
    )

    return response.status(201).json({
      message: `Usuario(a) ${name} criado com sucesso`
    })
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body
    const { id } = request.params

    const database = await sqliteConection()
    //=============VERIFICAÇÃO-1=============================//

    //-1--Aqui estou buscando no banco o id que o usuario está tentando atualizar
    const user = await database.get('SELECT * FROM users WHERE id=(?)', [id])
    // Aqui estou verificando se o usuario que a pessoa tentou atualizar existe no banco
    if (!user) {
      throw new AppError('Usúario não encontrado')
    }

    //=============VERIFICAÇÃO-2=============================//

    //--2--Aqui estou verificando se ele está tentando atualizar o email dele para um outro email já cadastrado no banco de dados!
    //SELECT * FROM users WHERE email = (?)', [email] ==> Vai buscar em todos os campos da minha tabela de usuarios, onde o email seja igual ao [email] recebido como parametro
    const userWithUpdateEmail = await database.get(
      'SELECT * FROM users WHERE email=(?)',
      [email]
    )
    //=============VERIFICAÇÃO-3=============================//
    //--3--Estou dizendo: Se ele econtrar um email e se esse email for diferente do id do mesmo, isso significa que ele está tentando mudar o email para um que ja existe!

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError('Esté email já está em uso!')
    }

    //=============AGORA PODEMOS ATUALIZAR=============================//
    //Aqui estou dizendo: Se tem conteudo no primeiro parametro, coloca ele, se não tiver coloca o do segundo, estou fazendo isso para quandoneu redefinir a senha, mesmo colocando o campo nome e emailm vazio ele ser preenchido automaticamente!
    user.name = name ?? user.name
    user.email = email ?? user.email

    //Aqui estou dizendo que: se o campo old_password não foi digitado, vou mandar um error//
    if (password && !old_password) {
      throw new AppError(
        'Você precisar digitar a senha antiga para definir a nova senha'
      )
    }

    //Aqui estou comparando a senha antiga digitada com a senha antiga do banco de dados, elas tem que ser iguais para eu autorizar a troca de senha.
    if (password && old_password) {
      const checkOld_password = await compare(old_password, user.password)

      if (!checkOld_password) {
        //Aqui estou checando se as senhas são diferentes se forem vai entrar nesse if e cuspír esse error
        throw new AppError('A senha antiga não confere')
      }

      //se tudo der certo, vamos atribuir a nova senha já criptografada
      user.password = await hash(password, 8)
    }

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

    return response.json({ message: 'Usuário Atualizado com sucesso' })
  }
}

module.exports = UserController
