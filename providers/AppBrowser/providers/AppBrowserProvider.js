'use strict'

/*
 * vow-browser-client
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const { ServiceProvider } = require('@adonisjs/fold');
let auth;

class BrowserProvider extends ServiceProvider {
  register () {

    this.app.bind('Test/AppBrowser', () => {
      const BrowsersJarManager = require('../src/Browser/BrowsersJar');

      return function (Suite, launchOptions) {
        const BrowsersJar = BrowsersJarManager(launchOptions);

        /**
         * Bind browser to the text context
         */
        Suite.Context.getter('browser', function () {
          return new BrowsersJar(Suite.Request, Suite.Response, auth, this.assert)
        }, true);

        /**
         * After each suite close the browser
         */
        Suite.after(async () => {
          await BrowsersJar.close()
        })
      }
    })
  }

  boot () {
    const Auth = this.app.use('Adonis/Src/Auth');
    const Config = this.app.use('Adonis/Src/Config');

    auth = new Auth({ request: this.request, response: this.response, session: this.session }, Config);
  }
}

module.exports = BrowserProvider
