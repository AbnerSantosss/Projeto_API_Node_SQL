// Importando o módulo Router do Express, que permite criar e manipular rotas
const { Router } = require('express')
const multer = require("multer")
const uploadConfig = require("../configs/upload")

// Importando o controller de usuário
const UserController = require('../controller/UserController')
const UserAvatarController = require('../controller/UserAvatarController')
// Importando o middleware de autenticação
const ensureAuthenticatiod = require('../middleware/ensureAuthenticatiod')


// Criando um objeto de rotas
const userRoutes = Router()


const upload = multer(uploadConfig.MULTER)


// Instanciando o controller de usuário
const userController = new UserController()
const userAvatarController = new UserAvatarController()


// Definindo a rota POST para criação de usuário
userRoutes.post('/', userController.create)

// Definindo a rota PUT para atualização de usuário, com o middleware de autenticação
userRoutes.put('/', ensureAuthenticatiod, userController.update)


userRoutes.patch("/avatar", ensureAuthenticatiod, upload.single("avatar"), userAvatarController.update)

// Exportando as rotas para serem utilizadas em outro arquivo, neste caso no server.js
module.exports = userRoutes


