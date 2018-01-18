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

  value: 0,

  setValue() {
    var float = (0).toFixed(2);
    let amount = Ember.get(this.get('model'), this.get('attr'));
    if(!Ember.isEmpty(amount)) {
      float = parseFloat(amount).toFixed(2);
    }
    var value = VMasker.toMoney(float);
    this.set('value', value);
    this.sendAction('onChange', amount);
  },

  init() {
    this._super(...arguments);
    this.setValue();
  },

  actions: {

    setValue() {
      var amount = parseFloat(this.get('value').replace(/\./g, '').replace(',','.'));
      Ember.set(this.get('model'), this.get('attr'), amount);
      this.sendAction('onchange');
    }

  },

  didInsertElement() {
    this.addObserver(`model.errors.${this.get('attr')}`, function(){
      let message = this.get(`model.errors.${this.get('attr')}.firstObject.message`);
      this.set('error', message);
    });
    VMasker(this.$().find("input")).maskMoney();
    this.$().find("input").focus(function() {
      $(this).select();
    });
  }

});
