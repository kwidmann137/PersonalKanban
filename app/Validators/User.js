'use strict';

class UserValidator{

  static get userRules () {
    return {
      first_name: 'required|alpha|min:1',
      last_name: 'required|alpha|min:1',
      email: 'required|unique:users,email|email',
      password: 'required|regex:^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$|min:8',
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
      'password.required': 'Password is required',
      'password.regex': "Password must contains at least 1 letter and 1 number",
      'password.min': "Password must be 8 alpha numeric characters",
      'confirm_password.same': "Passwords do not match"
    }
  }
}

module.exports = UserValidator;
