'use strict';

const User = use('App/Models/User');
const Hash = use('Hash');
const { test, trait } = use('Test/Suite')('Registration End Points');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('Test valid user registration', async ({ client, assert }) => {

  const newUser = {
    first_name: 'John',
    last_name: 'Smith',
    email: 'test2@example.com',
    password: 'abcd1234',
    confirm_password: 'abcd1234'
  };

  const response = await client.post('/register')
    .send(newUser)
    .end();

  response.assertStatus(201);
  response.assertText("User created");

  let user = await User.findBy("email", "test2@example.com");

  assert.equal(newUser.first_name, user.first_name);
  assert.equal(newUser.last_name, user.last_name);
  assert.equal(newUser.email, user.email);
  assert.isTrue(await Hash.verify(newUser.password, user.password));

});

test('Test register with missing name', async({client, assert}) => {

  const newUser = {
    email: 'test@example.com',
    password: 'abcd1234',
    confirm_password: 'abcd1234'
  };

  const response = await client.post('/register')
    .send(newUser)
    .end();

  response.assertStatus(405);

  response.assertJSONSubset([
    {
      field: "first_name",
      validation: "required",
      message: "First name is required"
    },
    {
      field: "last_name",
      validation: "required",
      message: "Last name is required"
    }
  ]);

});
