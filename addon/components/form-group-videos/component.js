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
    let videos = (value || []);
    if(videos.length == 0) {
      videos.pushObject({url: ""});
    }
    this.set('videos', videos);
  },

  init() {
    this._super(...arguments);
    this.bootstrap();
  },

  actions: {

    addVideo() {
      this.get('videos').pushObject({url: ""});
    },

    destroyVideo(video) {
      this.get('videos').removeObject(video);
    },

  }

});
