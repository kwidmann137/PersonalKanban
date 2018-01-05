'use strict';

const { test, trait, before } = use('Test/Suite')('Functional Item Tests');
const User = use('App/Models/User');
const auth = use('Adonis/Src/Auth');

trait('Test/AppBrowser');
trait('DatabaseTransactions');

let user;

before(async () => {
  user = await User.findBy('email', 'test@example.com');
});

test('Add item and ensure it is displayed on board', async ({browser}) => {

  await browser.loginViaJwt(user, 'password');

  const page = await browser
    .visit('/app');

  await page.assertHas("Today's Progress");



}).timeout(0);
