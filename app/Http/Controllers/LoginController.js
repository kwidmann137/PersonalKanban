'use strict'

class LoginController {

  * index(request, response){
    yield response.sendView('login');
  }
}

module.exports = LoginController
