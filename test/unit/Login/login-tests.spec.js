'use strict';

const User = use('App/Models/User');
const Hash = use('Hash');
const { test, trait } = use('Test/Suite')('Login End Points');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('Test valid login', async ({ client }) => {

  const loginUser ={
    email: 'test@example.com',
    password: 'password'
  };

  const response = await client.post('/login')
    .send(loginUser)
    .end();

  response.assertStatus(200);
  response.assertText('Authenticated');

});
