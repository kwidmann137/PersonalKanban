'use strict';

const { test, trait } = use('Test/Suite')('Registration User Tests');

trait('Test/Browser');

test('Register with missing names', async ({ browser}) => {

  const page = await browser.visit('/register');

  await page.assertHas("What's your name?");

  await page
    .type('input[name="first_name"]', '')
    .type('input[name="last_name"]', '')
    .click('button[name="submit"]')
    .waitForElement('div[name="step2"]')
    .type('input[name="email"]', 'test@example.com')
    .click('button[name="submit"]')
    .waitForElement('div[name="step3"]')
    .type('input[name="password"]', 'abcd1234')
    .type('input[name="confirm_password"]', 'abcd1234')
    .click('button[name="submit"]');

  await page.click('button[name="back"]')
    .click('button[name="back"]');

  await page.assertHas("First name is required");
  await page.assertHas("Last name is required");

}).timeout(0);
