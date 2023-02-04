const knex = require('../database/knex')

class NotesController {
  async create(request, respose) {
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

    respose.json({ message: 'deu certo' })
  }
}

module.exports = NotesController
