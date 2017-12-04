'use strict'

const Logger = use('Logger');
const { validateAll } = use('Validator');
const { categoryRules, categoryMessages, categoryValidateHours } = use('App/Validators/Category');
const { itemRules, itemMessages } = use('App/Validators/Item');

class ApiController {

  async addTask({request, response}){
    const task = request.post();
    Logger.info(task);
    response.status(200).send("Task Added");
  }

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

      let temp = await user.categories().fetch();

      response.send();

    }catch(e){
      Logger.error("Failed to update categories: %s", e);
      return response.status(400).send("Failed to update categories");
    }
  }

  async getCategories({response, auth}){
    let user = await auth.getUser();
    let categories = await user.categories().fetch();
    categories.rows.forEach(category => category.hours = JSON.parse(category.hours))
    return response.send(categories);

  }

  async addItem({request, response, auth}){

    const { item } = request.post();

    if(!item){
      return response.status(400).send("No item supplied");
    }

    const validation = await validateAll(item, itemRules, itemMessages);

    if(validation.fails()){
      // Logger.info(item);
      // Logger.error(validation.messages());
      return response.status(400).json(validation.messages());
    }

    const user = await auth.getUser();

    await user.items().create(item);

    return response.status(201).send("Item added");
  }

}

module.exports = ApiController;
