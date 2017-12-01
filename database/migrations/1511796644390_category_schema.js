'use strict';

const Schema = use('Schema');

class CategorySchema extends Schema {
  up () {
    this.create('categories', table => {
      table.increments();
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.string('name', 50).notNullable();
      table.string('color', 10).notNullable();
      table.string('hours', 50).notNullable();
      table.timestamps();
      table.unique(['name', 'user_id']);
    })
  }

  down () {
    this.drop('categories')
  }
}

module.exports = CategorySchema;
