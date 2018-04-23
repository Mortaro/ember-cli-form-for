import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({

  layout,

  tagName: '',

  columns: 12,

  required: false,

  gridClass: Ember.computed('columns', function() {
    return `col-md-${this.get('columns')}`;
  }),

  init() {
    this._super(...arguments);
    if(Ember.isEmpty(Ember.get(this.get('model'), this.get('attr')))) {
      if(!Ember.isEmpty(this.get('locale'))) {
        Ember.set(this.get('model'), this.get('attr'), {});
      }
    }
  },

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

    onchange(value) {
      if(!Ember.isEmpty(this.get('locale'))) {
        Ember.set(this.get('model'), `${this.get('attr')}.${this.get('locale')}`, value);
      } else {
        Ember.set(this.get('model'), this.get('attr'), value);
      }
      value = Ember.get(this.get('model'), this.get('attr'));
      this.sendAction('onchange', this.get('model'), this.get('attr'), value);
    }

  }

});
