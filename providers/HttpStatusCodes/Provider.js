const { ServiceProvider } = require('@adonisjs/fold');
const { HttpStatusCodes } = require('./HttpStatusCodes');

class HttpStatusCodesProvider extends ServiceProvider {
  register () {
    console.log(HttpStatusCodes);
    this.app.singleton('HttpStatusCodes', () => {
      return HttpStatusCodes;
    })
  }
}

module.exports = HttpStatusCodesProvider;
