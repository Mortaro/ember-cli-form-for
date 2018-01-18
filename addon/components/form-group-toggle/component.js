import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({

  layout,

  classNameBindings: ['gridClass'],

  columns: 12,

  required: false,

  gridClass: Ember.computed('columns', function() {
    return `col-md-${this.get('columns')}`;
  }),

  actions: {

    setValue(value) {
      Ember.set(this.get('model'), this.get('attr'), value)
      this.sendAction('onchange');
    }

  }

});
