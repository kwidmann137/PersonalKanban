const Factory = use('Factory');

const Hash = use('Hash');

Factory.blueprint('App/Models/User', async (faker) => {
  return {
    first_name: faker.first(),
    last_name: faker.last(),
    email: faker.email(),
    password: await Hash.make(faker.password()),
  }
});
