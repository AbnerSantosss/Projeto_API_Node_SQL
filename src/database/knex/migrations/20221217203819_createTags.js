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
