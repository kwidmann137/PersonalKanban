'use strict';

/*
|--------------------------------------------------------------------------
| TestSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory');
const Database = use('Database');
const Logger = use('Logger');
const Hash = use('Hash');

class TestSeeder {
  async run () {

    Factory.blueprint('App/Models/User', async (faker) => {
      return {
        first_name: faker.first(),
        last_name: faker.last(),
        email: faker.email(),
        password: await Hash.make(faker.password()),
      }
    });

    Factory.blueprint('App/Models/Item', async (faker, i, categories) => {

      let currDate = new Date();
      let endDate  = new Date();
      let numberDaysToAdd = Math.floor(Math.random() * 30);
      endDate.setDate(currDate.getDate() + numberDaysToAdd);

      return {
        description: faker.sentence(),
        due_date: randomDate(currDate, endDate),
        estimated_time: faker.hour() + ':' + faker.minute(),
        category_id: categories[i % 3].id,
        stage: 0,
        stage_index: 0,
        sorting_stage: 0,
        sorting_index: 0
      }

    });

    Factory.blueprint('App/Models/Category', async (faker, i) => {

      const colors = [
        '#f4a644',
        '#faf5ab',
        '#dbdbdb'
      ];

      return {
        name: faker.word(),
        color: colors[i],
        hours: JSON.stringify(
          [
            faker.integer({min:1, max:5}),
            faker.integer({min:1, max:5}),
            faker.integer({min:1, max:5}),
            faker.integer({min:1, max:5}),
            faker.integer({min:1, max:5}),
            faker.integer({min:1, max:5}),
            faker.integer({min:1, max:5})
          ]
        )
      }
    });

    let user = await Factory.model('App/Models/User').create();
    user.email = 'test@example.com';
    user.password = "password";
    user.save();

    let categories = await Factory.model('App/Models/Category').makeMany(3);

    await user.categories().saveMany(categories);

    categories = await user.categories().fetch();
    categories = categories.toJSON();

    let items = await Factory.model('App/Models/Item').makeMany(7, categories);

    await user.items().saveMany(items);

    await Database.close();
  }
}

module.exports = TestSeeder;

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
