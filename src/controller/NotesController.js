const knex = require('../database/knex')

class NotesController {
  async create(request, response) {
    //estou pegando os dados que vem do postman (do corpo da requisição)
    const { title, descriptions, tags, links } = request.body
    const { user_id } = request.params

    const note_id = await knex('notes').insert({ title, descriptions, user_id })

    const linksInsert = links.map(link => {
      return {
        note_id,
        url: link
      }
    })

    await knex('links').insert(linksInsert)

    //////VAMOS FAZER A MESMA COISA COM AS TAGS////////

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    })
    await knex('tags').insert(tagsInsert)

    response.json({ message: 'Tag criada com sucesso!' })
  }


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


  
  
  //Aqui vamos criar a função para Deletar as notas
   async delete (request, response){

  //Para fazer a funcionalidade de delete vamo pegar o id
  const {id} = request.params;

  await knex('notes').where({id}).delete();

  return response.json(`Nota ${id} deletada com sucesso!`);

  }


  //Função para Mostrar todas as notas

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

}

module.exports = NotesController
