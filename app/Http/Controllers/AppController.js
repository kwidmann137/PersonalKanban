'use strict'

class AppController {

  * index(request, response){
    yield response.sendView('app');
  }

}

module.exports = AppController
