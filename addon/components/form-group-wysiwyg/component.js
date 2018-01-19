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
    const pellButtons = document.getElementsByClassName('pell-button')
    for (let i = 0; i < pellButtons.length; i++) {
      pellButtons[i].setAttribute('type', 'button')
    }
  },

  actions: {

    setValue(value) {
      Ember.set(this.get('model'), this.get('attr'), value);
      this.sendAction('onchange');
    }

  }

});
