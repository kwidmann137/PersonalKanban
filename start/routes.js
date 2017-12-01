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

const Logger = use('Logger');

Route.get('/', ({view}) => view.render('landingPage'));

Route.get('/register', ({view}) => view.render('register'));

Route.post('/register', 'RegisterController.registerUser');

Route.get('/login', ({view}) => view.render('login'));

Route.post('/login', 'LoginController.login');

Route.get('/logout', 'LoginController.logout');

Route.get('/app', ({view}) => view.render('app')).middleware(['JwtAuth']);

Route.group(() => {
  Route.post('/addItem', 'ApiController.addItem');
  Route.post('/updateCategories', 'ApiController.updateCategories');
  Route.get('/getCategories', 'ApiController.getCategories');
}).prefix('/api/v1').middleware(['auth']);
