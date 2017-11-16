'use strict'

class LoginController {

  async login({request, view, auth}) {
    const { email, password } = request.all();
    await auth.attempt(email, password);
    return view.render('app');
  }

  async logout({view, auth}) {
    await auth.logout();
    return view.render('landingPage');
  }
}

module.exports = LoginController;
