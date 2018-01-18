/* eslint-env node */
'use strict';

module.exports = {

  name: 'form-for',

  included: function(app) {
    this._super.included.apply(this, arguments);
    this.import('vendor/vanilla-masker.js');
  },

  isDevelopingAddon() {
    return true;
  },

};
