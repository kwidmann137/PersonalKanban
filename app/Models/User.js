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
    });
    return categories
  }

  async itemsAsJSON(){
    let items = await this.items().fetch();
    items = items.toJSON();
    return items;
  }

}

module.exports = User;
