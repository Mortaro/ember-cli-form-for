import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({

  layout,

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

  create: null,

  filter: null,

  allowEmpty: true,

  actions: {

    setValue(option) {
      if(Ember.isEmpty(option)) {
        Ember.set(this.get('model'), this.get('attr'), null);
      } else {
        let keys = Object.keys(option);
        if(keys.length == 2 && keys.includes('value') && keys.includes('label')) {
          Ember.set(this.get('model'), this.get('attr'), Ember.get(option, 'value'));
        } else {
          Ember.set(this.get('model'), this.get('attr'), option);
        }
      }
      this.sendAction('onchange');
    },

    buildSuggestion(term) {
      return `Adicionar "${term}" (Enter)`;
    },

    showCreateWhen(term) {
      if (Ember.isEmpty(this.get('create'))) return false;
      term = Ember.copy(term).toLowerCase();
      return !this.get('options').filter((option) => {
        if(Ember.isEmpty(this.get('filter'))) {
          return option.toLowerCase() == term;
        } else {
          return option.get(this.get('filter')).toLowerCase() == term;
        }
      }).get('firstObject');
    },

    createOption(term) {
      this.sendAction('create', term);
    },

    selected(value) {
      if(Ember.isEmpty(value)) {
        return '';
      }
      if(typeof(value) == 'string') {
        let selected;
        this.get('options').forEach((option) => {
          if(Ember.get(option, 'value') == value) {
            selected = option;
          }
        });
        return selected || value;
      } else if(typeof(value) == 'number') {
        let selected;
        this.get('options').forEach((option) => {
          if(parseInt(Ember.get(option, 'value')) == value) {
            selected = option;
          }
        });
        return selected || value;
      } else {
        return value;
      }
    }

  },

});
