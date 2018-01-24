/* eslint-env node */
'use strict';

module.exports = {

  name: 'form-for',

  included: function(app) {
    this._super.included.apply(this, arguments);
    this.import('vendor/vanilla-masker.js');
    this.import('vendor/form-for.css');
  },

  isDevelopingAddon() {
    return true;
  },

};
