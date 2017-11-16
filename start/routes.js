'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route');

Route.get('/', ({view}) => view.render('landingPage'));

Route.get('/register', ({view}) => view.render('register'));

Route.post('/register', 'RegisterController.registerUser');

Route.get('/login', ({view}) => view.render('login'));

Route.post('/login', 'LoginController.login');

Route.post('/logout', 'LoginController.logout');

Route.group('/api/v1', async () => {
  Route.post('/addTask', 'ApiController.addTask');
});
