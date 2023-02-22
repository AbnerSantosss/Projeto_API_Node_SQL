//Importar o knex
const knex = require("../database/knex");


///Criar uma classe

class TagsController {

async index (request, response){
    //vamos recuperar o id od parametro
    const {user_id} = request.params;
    
    // Aqui estou dizendo para o knex assim: olha vai lá nas tags e filtra para mim onde seja igual ao user id
    const tags = await knex ("tags")
    .where({user_id})

    return response.json(tags)
    

}

}

module.exports = TagsController;