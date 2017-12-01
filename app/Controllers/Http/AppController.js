'use strict'

const Logger = use('Logger');

class AppController {

    async index({request, response, auth, view, session}){
      response
        .status(302)
        .render('app');
    }

}

module.exports = AppController;
