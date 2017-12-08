'use strict'

const { test, trait } = use('Test/Suite')('Functional Item Tests');
const User = use('App/Models/User');

trait('Test/Browser');
trait('DatabaseTransactions');

let user;

before(async () => {
  user = await User.findBy('email', 'test@example.com');
});

test('Add item and ensure it is displayed on board', async ({browser}) => {

  

  await browser.visit('/app');

}).timeout(0);
