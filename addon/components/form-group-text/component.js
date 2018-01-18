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
    if(!Ember.isEmpty(this.get('mask'))) {
      VMasker(this.$().find('input')).maskPattern(this.get('mask'));
      this.set('placeholder', this.get('mask'))
    }
  },

  actions: {

    clearErrors() {
      this.get('model.errors').clear(this.get('attr'));
    }

  }

});
