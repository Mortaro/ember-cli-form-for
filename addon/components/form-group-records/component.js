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
  },

  options: null,

  init() {
    this._super(...arguments);
    this.addObserver(`model.${this.get('attr')}`, function(){
      this.setupOptions();
    });
    this.setupOptions();
  },

  /*optionsObserver: Ember.observer('options', function() {
    console.log(this.get('options'));
    this.setupOptions();
  }),*/

  setupOptions() {
    this.set('checkboxes', {});
    let selected = Ember.get(this.get('model'), this.get('attr'));
    if(Ember.isEmpty(selected)) selected = [];
    this.get('options').forEach((option) => {
      if(selected.includes(option.get('id'))) {
        this.set(`checkboxes.${option.get('id')}`, true);
      }
    });
  },

  actions: {

    toggleRecord(model, attr) {
      let id = attr.split('.')[1];
      let selected = Ember.get(this.get('model'), this.get('attr'));
      if(Ember.isEmpty(selected)) selected = [];
      if(selected.includes(id)) {
        selected.removeObject(id);
      } else {
        selected.pushObject(id);
      }
      Ember.set(this.get('model'), this.get('attr'), selected);
    }

  }

});
