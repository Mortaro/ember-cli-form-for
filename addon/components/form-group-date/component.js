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

  didInsertElement() {
    this.addObserver(`model.errors.${this.get('attr')}`, function(){
      let message = this.get(`model.errors.${this.get('attr')}.firstObject.message`);
      this.set('error', message);
    });
    //VMasker(this.$().find("input")).maskPattern('99/99/9999');
  },

  actions: {

    setValue(value) {
      Ember.set(this.get('model'), this.get('attr'), value[0]);
      this.sendAction('onchange');
    }

  }

});
