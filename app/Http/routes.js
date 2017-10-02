'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('landingPage');

// Route.get('/login', function * (request, response){
//   yield response.sendView('login');
// });

Route.get('/login', 'LoginController.index');

Route.get('/register', 'RegisterController.index');
Route.post('/register', 'RegisterController.create');
Route.get('/app', 'AppController.index');

Route.group('v1', function(){
  //API Routes

}).prefix('api/v1').middleware('auth:api');
