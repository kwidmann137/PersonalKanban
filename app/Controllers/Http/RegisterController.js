'use strict';

const Logger = use('Logger');
const User = use('App/Models/User');
const {validateAll} = use('Validator');
const { rules, messages } = use('App/Validators/UserValidator');

Logger.transport('file');

class RegisterController {

  async registerUser({request, response}){

    let user = request.only([
      'first_name',
      'last_name',
      'email',
      'password',
      'confirm_password'
    ]);

    try{

      const validation = await validateAll(user, rules, messages);

      if(validation.fails()){
        return response.status(405).json(validation.messages());
      }

      delete user.confirm_password;

      await User.create(user);
      return response.status(201).send("User created");

    }catch(e){
      Logger.error("Failed to create user: %s", e);
      return response.status(400).send("Failed to create user");
    }

  }
}

module.exports = RegisterController;
