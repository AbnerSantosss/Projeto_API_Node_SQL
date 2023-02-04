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
