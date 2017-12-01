const Factory = use('Factory');

Factory.blueprint('App/Models/Category', async (faker) => {

  return {
    name: faker.word(),
    color: '',
    hours: [
      faker.integer({min:1, max:5}),
      faker.integer({min:1, max:5}),
      faker.integer({min:1, max:5}),
      faker.integer({min:1, max:5}),
      faker.integer({min:1, max:5}),
      faker.integer({min:1, max:5}),
      faker.integer({min:1, max:5})
    ]
  }
});
