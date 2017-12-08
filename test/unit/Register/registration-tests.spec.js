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
    email: 'test2121@example.com',
    password: 'abcd1234',
    confirm_password: 'abcd1234'
  };

  const response = await client.post('/register')
    .send(newUser)
    .end();

  response.assertStatus(201);
  response.assertText("Created and authenticated");

  let user = await User.findBy("email", "test2121@example.com");

  assert.equal(newUser.first_name, user.first_name);
  assert.equal(newUser.last_name, user.last_name);
  assert.equal(newUser.email, user.email);
  assert.isTrue(await Hash.verify(newUser.password, user.password));

});

test('Register with missing names', async ({ client }) => {

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

}).timeout(0);

test('Register with missing email', async ({ client }) => {

  const newUser = {
    first_name: 'John',
    last_name: 'Smith',
    password: 'abcd1234',
    confirm_password: 'abcd1234'
  };

  const response = await client.post('/register')
    .send(newUser)
    .end();

  response.assertStatus(405);

  response.assertJSONSubset([
    {
      field: "email",
      validation: "required",
      message: "Email is required"
    }
  ]);

}).timeout(0);


test('Register with email in use', async ({ client }) => {

  const newUser = {
    first_name: 'John',
    last_name: 'Smith',
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
      field: "email",
      validation: "unique",
      message: "Email address is not available"
    }
  ]);
}).timeout(0);


test('Register with invalid email', async ({ client }) => {

  const newUser = {
    first_name: 'John',
    last_name: 'Smith',
    email: 'test',
    password: 'abcd1234',
    confirm_password: 'abcd1234'
  };

  const response = await client.post('/register')
    .send(newUser)
    .end();

  response.assertStatus(405);

  response.assertJSONSubset([
    {
      field: "email",
      validation: "email",
      message: "Invalid email"
    }
  ]);

}).timeout(0);

test('Register with missing password', async ({ client }) => {

  const newUser = {
    first_name: 'John',
    last_name: 'Smith',
    email: 'test@example.com',
  };

  const response = await client.post('/register')
    .send(newUser)
    .end();

  response.assertStatus(405);

  response.assertJSONSubset([
    {
      field: "password",
      validation: "required",
      message: "Password is required"
    }
  ]);

}).timeout(0);

test('Register with non alpha numeric password', async ({ client }) => {

  const newUser = {
    first_name: 'John',
    last_name: 'Smith',
    email: 'test@example.com',
    password: 'abcdefgh',
    confirm_password: 'abcdefgh'
  };

  const response = await client.post('/register')
    .send(newUser)
    .end();

  response.assertStatus(405);

  response.assertJSONSubset([
    {
      field: "password",
      validation: "regex",
      message: "Password must contains at least 1 letter and 1 number",
    }
  ]);

}).timeout(0);


test('Register with short password', async ({ client }) => {

  const newUser = {
    first_name: 'John',
    last_name: 'Smith',
    email: 'test@example.com',
    password: 'abcd',
    confirm_password: 'abcd'
  };

  const response = await client.post('/register')
    .send(newUser)
    .end();

  response.assertStatus(405);

  response.assertJSONSubset([
    {
      field: "password",
      validation: "min",
      message: "Password must be 8 alpha numeric characters"
    }
  ]);

}).timeout(0);


test('Register with passwords that do not match', async ({ client }) => {

  const newUser = {
    first_name: 'John',
    last_name: 'Smith',
    email: 'test@example.com',
    password: 'abcd1234',
    confirm_password: 'abcd1235'
  };

  const response = await client.post('/register')
    .send(newUser)
    .end();

  response.assertStatus(405);

  response.assertJSONSubset([
    {
      field: "confirm_password",
      validation: "same",
      message: "Passwords do not match",
    }
  ]);

}).timeout(0);
