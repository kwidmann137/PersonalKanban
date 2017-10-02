'use strict'

const Lucid = use('Lucid')
const Hash = use('Hash')

class User extends Lucid {

  static boot () {
    super.boot()

    /**
     * Hashing password before storing to the
     * database.
     */
    this.addHook('beforeCreate', function * (next) {
      this.password = yield Hash.make(this.password)
      yield next
    })
  }

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  static get rules(){
    return {
      firstName: 'required|alpha|min:1',
      lastName: 'required|alpha|min:1',
      email: 'required|unique:users,email|email',
      password: 'required|alpha_numeric|min:8',
      confirmPassword: 'required|same:password'
    }
  }

  static get errorMessages(){
    return {
      firstName: 'Invalid',
      lastName: 'invalid',
      email: 'invalid',
      password: 'invalid',
      confirmPassword: 'invalid'
    }
  }

}

module.exports = User
