(function(factory) {
  'use strict';
  define(['jquery', 'underscore', 'backbone'], factory);
})(function($, _, Backbone) {
  'use strict';
  var EmotionItem = Backbone.Model.extend({
    defaults: {
      command: '',
      tarNone: '',
      tarTarget: ''
    },
    initialize: function() {
      // console.log('[Model] EmotionItem: ' + this.get('command') + ' has been initialized');
    }
  });
  return EmotionItem;
});