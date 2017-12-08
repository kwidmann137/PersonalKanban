'use strict'

const Logger = use('Logger');
const Item = use('App/Models/Item');
const { validateAll } = use('Validator');
const { categoryRules, categoryMessages, categoryValidateHours, categoryValidateMaxDailyHoursNotExceded } = use('App/Validators/Category');
const { itemRules, itemMessages } = use('App/Validators/Item');

class ApiController {

  async updateCategories({request, response, auth}){

    let data = request.post();

    if(!data.categories){
      return response.status(400).send("No categories supplied");
    }

    //validate categories;
    try{

      const validation = await validateAll(data, categoryRules, categoryMessages);

      if(validation.fails()){
        return response.status(405).json(validation.messages());
      }

      let hourErrors = categoryValidateHours(data.categories);

      if(hourErrors.length !== 0){
        return response.status(405).json(hourErrors);
      }

      // let maxHourErrors = categoryValidateMaxDailyHoursNotExceded(data.categories);
      //
      // if(maxHourErrors.length !== 0){
      //   return response.status(405).json(maxHourErrors);
      // }

      let user = await auth.getUser();

      data.categories.forEach(category => category.hours = JSON.stringify(category.hours));

      let newCategories = data.categories.filter(category => category.id === null);
      let updatedCategories = data.categories.filter(category => category.id !== null);

      newCategories.forEach(category => {
        delete category.id;
      });

      await user.categories().createMany(newCategories);

      updatedCategories.forEach(async category => {
        await user
          .categories()
          .where('id', category.id)
          .update({
            name: category.name,
            color: category.color,
            hours: category.hours
          });
      });

      response.send(await user.categoriesAsJSON());

    }catch(e){
      Logger.error("Failed to update categories: %s", e);
      return response.status(400).send("Failed to update categories");
    }
  }

  async deleteCategory({request, auth}){
    const user = await auth.getUser();
    const { category } = request.post();

    await user
      .items()
      .where('category_id', category.id)
      .delete();

    await user
      .categories()
      .where('id', category.id)
      .delete();

    return;
  };

  async getCategories({response, auth}){
    let user = await auth.getUser();
    let categories = await user.categoriesAsJSON();
    return response.send(categories);
  }

  async addItem({request, response, auth}){

    const { item } = request.post();

    if(!item){
      return response.status(400).send("No item supplied");
    }

    const validation = await validateAll(item, itemRules, itemMessages);

    if(validation.fails()){
      return response.status(400).json(validation.messages());
    }

    const user = await auth.getUser();

    const newItem = await user.items().create(item);

    return response.status(201).send(newItem.toJSON());
  }

  async updateItem({request, response, auth}){

    const { item } = request.post();

    if(!item){
      return response.status(400).send("No item supplied");
    }

    const validation = await validateAll(item, itemRules, itemMessages);

    if(validation.fails()){
      return response.status(400).json(validation.messages());
    }

    const user = await auth.getUser();

    try{
      await user.items()
        .where('id', item.id)
        .update(item);
    }catch(err){
      Logger.error(err);
    }

    const newItem = await Item.find(item.id);

    return response.status(200).send(newItem.toJSON());

  }

  async getItems({response, auth}){
    let user = await auth.getUser();
    let items = await user.itemsAsJSON();
    items.forEach(item => {
      delete item.user_id;
      delete item.updated_at;
      delete item.created_at;
    });
    return response.send(items);
  }

}

module.exports = ApiController;
