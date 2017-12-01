'use strict'

const Logger = use('Logger');

class JwtAuth {

  async handle ({ request, response,  auth }, next) {


    /**
     * Verify jwt token and wrap exception inside custom
     * exception classes
     */
    try {
      //ToDo: Switch this back to an encrypted cookie once custom middleware is made
      const jwt = JSON.parse(request.plainCookie('token'));
      const jwtPayload = await auth._verifyToken(jwt.token)
      if(jwtPayload){
        const user = await auth._serializerInstance.findById(jwtPayload.uid);
        if (!user) {
          response.redirect('/login');
        }
      }
    }catch ({ name, message }) {
      response.redirect('/login');
    }

    // call next to advance the request
    await next()
  }
}

module.exports = JwtAuth;
