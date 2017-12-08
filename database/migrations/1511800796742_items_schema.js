'use strict'

const Schema = use('Schema')

class ItemsSchema extends Schema {
  up () {
    this.create('items', table => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('description', 200).notNullable()
      table.date('due_date').notNullable()
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.time('estimated_time', 50).notNullable()
      table.integer('stage').notNullable()
      table.integer('stage_index').notNullable()
      table.integer('sorting_stage').notNullable()
      table.integer('sorting_index').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('items')
  }
}

module.exports = ItemsSchema
