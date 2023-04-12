const { Router } = require('express'); //Estamos fazendo a importação o express para poder trabalhar as rotas aqui nesse arquivo

const TagsController = require('../controller/TagsController');
const ensureAuthenticatiod = require('../middleware/ensureAuthenticatiod')


const tagsRoutes = Router(); //Chamamos o Router


const tagsController = new TagsController();

//estamos estanciando a classe que contém os metodos que vamos precisar

tagsRoutes.get('/',ensureAuthenticatiod, tagsController.index);


module.exports = tagsRoutes //Aqui estou exportando para chamar lá no server.js

