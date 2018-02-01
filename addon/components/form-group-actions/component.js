import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({

  layout,

  classNames: ['col-md-12'],

  label: 'Salvar',

  actions: {

    submit() {
      this.sendAction('submit', this.get('model'));
    }

  }

});
