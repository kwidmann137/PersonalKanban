'use strict';

const Model = use('Model');
const Logger = use('Logger');

class User extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', 'User.hashPassword')
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  categories(){
    return this.hasMany('App/Models/Category');
  }

  items () {
    return this.hasMany('App/Models/Item');
  }

  async categoriesAsJSON() {
    let categories = await this.categories().fetch();
    categories = categories.toJSON();
    categories.forEach(category => {
      category.hours = JSON.parse(category.hours);
      delete category.user_id;
      delete category.created_at;
      delete category.updated_at;
    });
    return categories
  }

  async itemsAsJSON(){
    let items = await this.items().fetch();
    items = items.toJSON();
    //ToDo: See if you can stop DB from manipulating date string on query
    items.forEach(item => {
      item.estimated_time = item.estimated_time.slice(0,5);
      item.due_date = new Date(item.due_date).toISOString().slice(0,10);
      item.completed = item.completed === 1;
      delete item.created_at;
      delete item.updated_at;
    });
    return items;
  }

}

module.exports = User;
