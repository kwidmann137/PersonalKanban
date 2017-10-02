'use strict'

const util = require("util");
const Validator = use('Validator');
const User = use('App/Model/User');

class RegisterController {

  * index(request, response){
    yield response.sendView("register", {});
  }

  * create(request, response){

    const userData = request.post();

    try{
      const validator = yield Validator.validateAll(userData, User.rules);
      if(validator.fails()){
        yield response.status(405).json(validator.messages());
        return;
      }
    }catch(e){
      response.status(400).send("Failed to create user");
      return;
    }

    try{
      const userFields = {
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        password: userData.password
      };
      yield User.create(userFields);
      response.status(201).send("User created");
    }catch(e){
      response.status(400).send(e);
    }

  }
}

module.exports = RegisterController;
