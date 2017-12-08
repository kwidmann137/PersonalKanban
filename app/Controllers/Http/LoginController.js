'use strict'

const Logger = use('Logger');
const Hash = use('Hash');

class LoginController {

  async login({request, response, auth}) {
    const { email, password } = request.post();
    try{
      const jwt = await auth.attempt(email, password);

      await response.plainCookie('token', JSON.stringify(jwt));

      response.status(200).send("Authenticated");
    }catch(error){

      await response.clearCookie('token');

      response
        .status(401)
        .send("Invalid username or password");
    }
  }

  async logout({request, response}) {
    await response.clearCookie('token');
    return response.redirect('/login');
  }
}

module.exports = LoginController;
