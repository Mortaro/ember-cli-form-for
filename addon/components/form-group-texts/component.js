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

  init() {
    this._super(...arguments);
    let value = Ember.get(this.get('model'), this.get('attr'));
    let texts = (value || []).map((v) => {
      return {value: v};
    });
    if(texts.length == 0) {
      texts.pushObject({value: ""});
    }
    this.set('texts', texts);
  },

  serialize() {
    let value = this.get('texts').map((t) => {
      return t.value;
    });
    Ember.set(this.get('model'), this.get('attr'), value);
    this.sendAction('onchange', this.get('model'), this.get('attr'), value);
  },

  actions: {

    serialize() {
      this.serialize();
    },

    addText() {
      this.get('texts').pushObject({value: ""});
      this.serialize();
    },

    destroyText(text) {
      this.get('texts').removeObject(text);
      this.serialize();
    },

  }

});
