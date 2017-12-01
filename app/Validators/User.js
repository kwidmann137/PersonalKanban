'use strict';

class UserValidator{

  static get userRules () {
    return {
      first_name: 'required|alpha|min:1',
      last_name: 'required|alpha|min:1',
      email: 'required|unique:users,email|email',
      password: 'required|alpha_numeric|min:8',
      confirm_password: 'required|same:password'
    }
  }

  static get userMessages(){
    return {
      'first_name.required': "First name is required",
      'last_name.required': "Last name is required",
      'email.required': "Email is required",
      'email.unique': "Email address is not available",
      'email.email' : 'Invalid email',
      'password': "Password must be 8 alpha numeric characters",
      'confirm_password.same': "Passwords do not match"
    }
  }
}

module.exports = UserValidator;
