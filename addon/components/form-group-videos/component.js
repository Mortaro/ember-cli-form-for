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
    let videos = (value || []).map((v) => {
      return {value: v};
    });
    if(videos.length == 0) {
      videos.pushObject({value: ""});
    }
    this.set('videos', videos);
  },

  serialize() {
    let value = this.get('videos').map((t) => {
      return t.value;
    });
    Ember.set(this.get('model'), this.get('attr'), value);
    this.sendAction('onchange', this.get('model'), this.get('attr'), value);
  },

  actions: {

    serialize() {
      this.serialize();
    },

    addVideo() {
      this.get('videos').pushObject({url: ""});
    },

    destroyVideo(video) {
      this.get('videos').removeObject(video);
    },

  }

});
