'use strict';

const { test, trait } = use('Test/Suite')('Login Tests');

trait('Test/Browser');

test('Navigate to app without logging in redirects to login', async ({ browser }) => {

  let page = await browser.visit('/app');

  page.assertPath('/login');

}).timeout(0);

test('Valid login redirects', async ({browser, assert}) => {

  let page = await browser.visit('/login');

  await page.assertHas("Login");

  await page
    .type('input[name="email"]', 'test@example.com')
    .type('input[name="password"]', 'password');

  await page.click('button[name="login"]')
    .waitForNavigation();

  const currentURL = await page.getPath();

  assert.equal('/app', currentURL);
});

test('Error message is displayed with invalid email', async({browser}) => {

  let page = await browser.visit('/login');

  await page.assertHas("Login");

  await page
  .type('input[name="email"]', 'test')
  .type('input[name="password"]', 'password');

  await page.click('button[name="login"]');

  await page.waitForElement('#error', 10000);

  await page.assertHas("Invalid username or password");

});

test('Error message is displayed with invalid password', async({browser}) => {

  let page = await browser.visit('/login');

  await page.assertHas("Login");

  await page
    .type('input[name="email"]', 'test@example.com')
    .type('input[name="password"]', '');

  await page.click('button[name="login"]');

  await page.waitForElement('#error', 10000);

  await page.assertHas("Invalid username or password");

});
