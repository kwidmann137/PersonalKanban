const Factory = use('Factory');

Factory.blueprint('App/Models/Item', async (faker) => {

  return {
    text: faker.sentence(),
    estimated_time: faker.integer({min: 1, max:20}),
    index: 0,
    stage: 0,
    stage_index: 0,
    sorting_stage: 0,
    sorting_index: 0
  }

});
