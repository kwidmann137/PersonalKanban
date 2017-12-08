'use strict';

const Logger = use('Logger');
const User = use('App/Models/User');
const {validateAll} = use('Validator');
const { userRules, userMessages } = use('App/Validators/User');

Logger.transport('file');

class RegisterController {

  async registerUser({request, response, auth}){

    let user = request.only([
      'first_name',
      'last_name',
      'email',
      'password',
      'confirm_password'
    ]);

    try{

      const validation = await validateAll(user, userRules, userMessages);

      if(validation.fails()){
        return response.status(405).json(validation.messages());
      }

      delete user.confirm_password;

      await User.create(user);

      try{
        const jwt = await auth.attempt(user.email, user.password);

        await response.plainCookie('token', JSON.stringify(jwt));

        response.status(201).send("Created and authenticated");
      }catch(error){

        await response.clearCookie('token');

        response
          .status(401)
          .send("Invalid login credentials");
      }

    }catch(e){
      Logger.error("Failed to create user: %s", e);
      return response.status(400).send("Failed to create user");
    }

  }
}

module.exports = RegisterController;
