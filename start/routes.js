'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller APIReducers to them.
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

  Route.get('/getItems', 'ApiController.getItems');
  Route.post('/addItem', 'ApiController.addItem');
  Route.post('/updateItem', 'ApiController.updateItem');

  Route.get('/getCategories', 'ApiController.getCategories');
  Route.post('/updateCategories', 'ApiController.updateCategories');
  Route.post('/deleteCategory', 'ApiController.deleteCategory');

}).prefix('/api/v1').middleware(['auth']);
