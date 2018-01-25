import Ember from 'ember';
import layout from './template';
import states from './states';

export default Ember.Component.extend({

  layout,

  classNameBindings: ['gridClass'],

  columns: 12,

  required: false,

  gridClass: Ember.computed('columns', function() {
    return `col-md-${this.get('columns')}`;
  }),

  states: states,

  init() {
    this._super(...arguments);
    let address = Ember.get(this.get('model'), this.get('attr'));
    if(Ember.isEmpty(address)) {
      Ember.set(this.get('model'), this.get('attr'), {});
    }
  },

  didInsertElement() {
    this.addObserver(`model.errors.${this.get('attr')}`, function(){
      let message = this.get(`model.errors.${this.get('attr')}.firstObject.message`);
      this.set('error', message);
    });
  },

  actions: {

    completeAddress() {
      let address = Ember.get(this.get('model'), this.get('attr'));
      let cep = Ember.get(address, 'cep');
      if(cep.length == 9) {
        $.getJSON("//viacep.com.br/ws/"+ cep +"/json/?callback=?", (dados) => {
          if (!("erro" in dados)) {
            Ember.set(address, 'street', dados.logradouro);
            Ember.set(address, 'neighborhood', dados.bairro);
            Ember.set(address, 'city', dados.localidade);
            Ember.set(address, 'uf', dados.uf);
          }
        });
      }
    },

    setUf(uf) {
      this.set('uf', uf);
    },

    setCity(city) {
      this.set('city', city);
    }

  }

});
