import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({

  layout,

  tagName: 'form',
  classNames: ['row', 'form-for'],

  actions: {

    submit(e) {
      return false;
    }

  }

});
