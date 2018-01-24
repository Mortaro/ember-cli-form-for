import Ember from 'ember';
import layout from './template';
import EmberUploader from 'ember-uploader';

export default Ember.Component.extend({

  layout,

  classNameBindings: ['gridClass', 'isDragging', 'isUploading'],

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

  dragCount: 0,

  isDragging: false,

  uploadQueue: 0,

  isUploading: Ember.computed('uploadQueue', function(){
    return this.get('uploadQueue') > 0;
  }),

  init() {
    this._super(...arguments);
  },

  dragOver(event){
    event.preventDefault();
  },

  dragEnter(event){
    event.preventDefault();
    this.set('dragCount', this.get('dragCount') + 1);
    this.set('isDragging', true);
  },

  dragLeave(event){
    event.preventDefault();
    if(this.get('dragCount') > 0) {
      this.set('dragCount', this.get('dragCount') - 1);
    }
    if(this.get('dragCount') == 0) {
      this.set('isDragging', false);
    }
  },

  drop: function(event){
    event.preventDefault();
    this.set('isDragging', false);
    this.set('dragCount', 0);
    this.upload(event.dataTransfer.files);
  },

  upload(files) {

    Array.from(files).forEach((file) => {

      this.set('uploadQueue', this.get('uploadQueue') + 1);

      let uploader = EmberUploader.S3Uploader.extend({
        signingUrl: this.get('host'),
        signingAjaxSettings: {
          headers: {
            "Authorization": `Bearer ${this.get('token')}`
          }
        }
      }).create();

      uploader.on('didUpload', response => {
        let uploadedUrl = $(response).find('Location')[0].textContent;
        uploadedUrl = decodeURIComponent(uploadedUrl);
        this.set('uploadQueue', this.get('uploadQueue') - 1);
        Ember.set(this.get('model'), this.get('attr'), uploadedUrl);
      });

      uploader.on('progress', e => {
        var progress = parseInt(e.percent)
        if(progress > 99) {
          this.set('progress', 0);
        } else {
          this.set('progress', progress);
        }
      });

      uploader.upload(file);

    });

  },

  actions: {

    changeFileInput(event) {
      this.upload(event.target.files);
    },

    clear() {
      Ember.set(this.get('model'), this.get('attr'), null);
    }

  }

});
