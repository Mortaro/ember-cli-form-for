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

  bootstrap() {
    let value = Ember.get(this.get('model'), this.get('attr'));
    let phones = (value || []);
    if(phones.length == 0) {
      phones.pushObject({number: "", whatsapp: false});
    }
    this.set('phones', phones);
  },

  init() {
    this._super(...arguments);
    this.bootstrap();
  },

  serialize() {
    let value = this.get('phones');
    console.log(value);
    Ember.set(this.get('model'), this.get('attr'), value);
    this.sendAction('onchange', this.get('model'), this.get('attr'), value);
  },

  actions: {

    serialize() {
      this.serialize();
    },

    addPhone() {
      this.get('phones').pushObject({number: "", whatsapp: false});
      this.serialize();
    },

    destroyPhone(phone) {
      this.get('phones').removeObject(phone);
      this.serialize();
    },

    changeMask(e) {
      this.$('input').each(function() {
        let value = $(this).val().replace(/\D/g, '')
        var number = value.charAt(2);
        if(value[0] == '0') {
          VMasker($(this)).unMask();
          VMasker($(this)).maskPattern('9999 999 9999');
        } else if(number == 9) {
          VMasker($(this)).unMask();
          VMasker($(this)).maskPattern('(99) 99999-9999');
        } else {
          VMasker($(this)).unMask();
          VMasker($(this)).maskPattern('(99) 9999-9999');
        }
      })
    },

  }

});
