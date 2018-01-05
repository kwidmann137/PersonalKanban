'use strict'

/*
 * vow-browser-client
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const debug = require('debug')('adonis:vow:browser');

class Browser {
  constructor (BaseRequest, BaseResponse, browser, assert) {
    debug('instantiating browser');

    const Response = require('./Response')(BaseResponse);
    this.Request = require('./Request')(BaseRequest, Response);
    this._assert = assert;
    this._browser = browser;
    this._loggedIn = false;
    this._token = null;
  }

  /**
   * Visit a url and get back page response
   *
   * @method visit
   *
   * @param  {String}   url
   * @param  {Function} callback
   * @param  {Object}   options
   *
   * @return {BrowserResponse}
   */
  async visit (url, callback, options) {
    /**
     * if url is absolute, then use it, otherwise prefix
     * TEST_SERVER_URL
     */
    url = /^http(s)?/.test(url) ? url : `${process.env.TEST_SERVER_URL}${url}`

    const request = new this.Request(this._browser, url, this._assert)

    if(this._loggedIn){
      request.cookie('token', this._token);
      // request.header('Authorization', 'Bearer ' + this._token);
    }

    if (typeof (callback) === 'function') {
      callback(request)
    }

    return request.end(options)
  }

  /**
   * Closes the browser
   *
   * @method close
   * @async
   *
   * @return {void}
   */
  close () {
    return this._browser.close()
  }
}

module.exports = Browser
