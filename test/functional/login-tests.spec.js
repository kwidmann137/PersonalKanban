'use strict';

const { test, trait } = use('Test/Suite')('Login Tests');

trait('Test/Browser');

test('Navigate to app without logging in', async ({ browser}) => {

  let page = await browser.visit('/app');

  page.assertPath('/login');

}).timeout(0);
