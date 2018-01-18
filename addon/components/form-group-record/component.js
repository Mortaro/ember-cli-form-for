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

  store: Ember.inject.service(),

  create: null,

  optionLabel: null,

  modelClass: null,

  allowEmpty: true,

  query: null,

  _search(filter) {
    let query = Object.assign((this.get('query') || {}), {
      filter: filter,
      page: {
        number: 1,
        size: 10
      }
    });
    if(Ember.isEmpty(this.get('modelClass'))) {
      this.get('model').eachRelationship((name, descriptor) => {
        if(name == this.get('attr')) {
          this.set('modelClass', descriptor.type);
        }
      });
    }
    return this.get('store').query(this.get('modelClass'), query);
  },

  queryObserver: Ember.observer('query', function() {
    this.set('options', this._search());
  }),

  actions: {

    search(filter) {
      return this._search(filter);
    },

    setValue(value) {
      Ember.set(this.get('model'), this.get('attr'), value);
      //this.get('model.errors').clear(this.get('attr'));
      this.sendAction('onchange', this.get('model'), this.get('attr'), value);
    },

    buildSuggestion(term) {
      return `Adicionar "${term}" (Enter)`;
    },

    showCreateWhen(term) {
      return !Ember.isEmpty(this.get('create'));
    },

    createOption(term) {
      this.sendAction('create', term);
    }

  },

  didInsertElement() {
    this.set('options', this._search());
  }

});
