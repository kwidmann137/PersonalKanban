'use strict';

const { test, trait } = use('Test/Suite')('Registration User Tests');

trait('Test/Browser');
trait('DatabaseTransactions');

test('Register with missing names', async ({ browser}) => {

  const page = await browser.visit('/register');

  await page.assertHas("What's your name?");

  await page
    .click('button[name="submit"]')
    .waitForElement('div[name="step2"]')
    .type('input[name="email"]', 'test@example.com')
    .click('button[name="submit"]')
    .waitForElement('div[name="step3"]')
    .type('input[name="password"]', 'abcd1234')
    .type('input[name="confirm_password"]', 'abcd1234')
    .click('button[name="submit"]');

  await page.waitForElement('div[name="step1"]');

  await page.assertHas("First name is required");
  await page.assertHas("Last name is required");

}).timeout(0);

test('Register with missing email', async ({ browser}) => {

  const page = await browser.visit('/register');

  await page.assertHas("What's your name?");

  await page
    .type('input[name="first_name"]', 'John')
    .type('input[name="last_name"]', 'Smith')
    .click('button[name="submit"]')
    .waitForElement('div[name="step2"]')
    .click('button[name="submit"]')
    .waitForElement('div[name="step3"]')
    .type('input[name="password"]', 'abcd1234')
    .type('input[name="confirm_password"]', 'abcd1234')
    .click('button[name="submit"]');

  await page.waitForElement('div[name="step2"]');

  await page.assertHas("Email is required");

}).timeout(0);


test('Register with email in use', async ({ browser}) => {

  const page = await browser.visit('/register');

  await page.assertHas("What's your name?");

  await page
    .type('input[name="first_name"]', 'John')
    .type('input[name="last_name"]', 'Smith')
    .click('button[name="submit"]')
    .waitForElement('div[name="step2"]')
    .type('input[name="email"]', 'test@example.com')
    .click('button[name="submit"]')
    .waitForElement('div[name="step3"]')
    .type('input[name="password"]', 'abcd1234')
    .type('input[name="confirm_password"]', 'abcd1234')
    .click('button[name="submit"]');

  await page.waitForElement('div[name="step2"]');

  await page.assertHas("Email address is not available");

}).timeout(0);


test('Register with invalid email', async ({ browser}) => {

  const page = await browser.visit('/register');

  await page.assertHas("What's your name?");

  await page
    .type('input[name="first_name"]', 'John')
    .type('input[name="last_name"]', 'Smith')
    .click('button[name="submit"]')
    .waitForElement('div[name="step2"]')
    .type('input[name="email"]', 'test')
    .click('button[name="submit"]')
    .waitForElement('div[name="step3"]')
    .type('input[name="password"]', 'abcd1234')
    .type('input[name="confirm_password"]', 'abcd1234')
    .click('button[name="submit"]');

  await page.waitForElement('div[name="step2"]');

  await page.assertHas("Invalid email");

}).timeout(0);

test('Register with missing password', async ({ browser}) => {

  const page = await browser.visit('/register');

  await page.assertHas("What's your name?");

  await page
    .type('input[name="first_name"]', 'John')
    .type('input[name="last_name"]', 'Smith')
    .click('button[name="submit"]')
    .waitForElement('div[name="step2"]')
    .type('input[name="email"]', 'john@example.com')
    .click('button[name="submit"]')
    .waitForElement('div[name="step3"]')
    .click('button[name="submit"]');

  await page.waitUntilMissing('#loading');

  await page.assertHas("Password is required");

}).timeout(0);

test('Register with non alpha numeric password', async ({ browser}) => {

  const page = await browser.visit('/register');

  await page.assertHas("What's your name?");

  await page
    .type('input[name="first_name"]', 'John')
    .type('input[name="last_name"]', 'Smith')
    .click('button[name="submit"]')
    .waitForElement('div[name="step2"]')
    .type('input[name="email"]', 'john@example.com')
    .click('button[name="submit"]')
    .waitForElement('div[name="step3"]')
    .type('input[name="password"]', 'abcdefgh')
    .type('input[name="confirm_password"]', 'abcdefgh')
    .click('button[name="submit"]');

  await page.waitUntilMissing('#loading');

  await page.assertHas("Password must contains at least 1 letter and 1 number");

}).timeout(0);


test('Register with short password', async ({ browser}) => {

  const page = await browser.visit('/register');

  await page.assertHas("What's your name?");

  await page
    .type('input[name="first_name"]', 'John')
    .type('input[name="last_name"]', 'Smith')
    .click('button[name="submit"]')
    .waitForElement('div[name="step2"]')
    .type('input[name="email"]', 'john@example.com')
    .click('button[name="submit"]')
    .waitForElement('div[name="step3"]')
    .type('input[name="password"]', 'abcd')
    .type('input[name="confirm_password"]', 'abcd')
    .click('button[name="submit"]');

  await page.waitUntilMissing('#loading');

  await page.assertHas("Password must be 8 alpha numeric characters");

}).timeout(0);


test('Register with passwords that do not match', async ({ browser}) => {

  const page = await browser.visit('/register');

  await page.assertHas("What's your name?");

  await page
    .type('input[name="first_name"]', 'John')
    .type('input[name="last_name"]', 'Smith')
    .click('button[name="submit"]')
    .waitForElement('div[name="step2"]')
    .type('input[name="email"]', 'john@example.com')
    .click('button[name="submit"]')
    .waitForElement('div[name="step3"]')
    .type('input[name="password"]', 'abcd1234')
    .type('input[name="confirm_password"]', 'abcd1235')
    .click('button[name="submit"]');

  await page.waitUntilMissing('#loading');

  await page.assertHas("Passwords do not match");

}).timeout(0);


test('Valid registration redirects to app', async ({ browser, assert}) => {

  const page = await browser.visit('/register');

  await page.assertHas("What's your name?");

  await page
    .type('input[name="first_name"]', 'John')
    .type('input[name="last_name"]', 'Smith')
    .click('button[name="submit"]')
    .waitForElement('div[name="step2"]')
    .type('input[name="email"]', 'john@example.com')
    .click('button[name="submit"]')
    .waitForElement('div[name="step3"]')
    .type('input[name="password"]', 'abcd1234')
    .type('input[name="confirm_password"]', 'abcd1234')
    .click('button[name="submit"]');

  await page.waitForNavigation();

  const currentURL = await page.getPath();

  assert.equal('/app', currentURL)

}).timeout(0);
