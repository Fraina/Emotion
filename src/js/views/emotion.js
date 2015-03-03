(function(factory) {
  'use strict';
  define([
    'jquery',
    'underscore',
    'backbone',
    'collections/items',
    'text!templates/emotion.html'
  ], factory);
})(function($, _, Backbone, Collections, Template) {
  'use strict';
  var Emotion = Backbone.View.extend({
    collection: new Collections(),
    template: Template,
    events: {
      'keyup input.inputArea-search': '_search',
      'keyup input.inputArea-target': '_show',
      'click span': '_active'
    },
    initialize: function() {
      console.log('[View] Emotion has been initialized.');
      this.$el.html(this.template);
      this.collection.fetch();
      this.results = '';
      this.active = '';
      var input = $('input[class^=inputArea]');
      input
        .focus(function() {
          $(this).siblings('span').addClass('is-focus');
        })
        .blur(function() {
          if ($(this).val() === '') {
            $(this).siblings('span').removeClass('is-focus');
          }
        });
      return this;
    },
    _search: function(e) {
      this.$el.find('div.emotions').html('<p>emotion tags</p>');
      this.results = this.collection.filterValues($(e.target).val());
      var resultsLength = this.results.length;
      for (var i = 0; i < resultsLength; i++) {
        this.$el.find('div.emotions').append('<span class="mrm" data-index="' + i + '" style="background: #e0e0e0">' + this.results[i].get('command') + '</span>')
      }
    },
    _active: function(e) {
      this.active = $(e.target).attr('data-index');
      this._show();
    },
    _show: function(e) {
      if ($('input.inputArea-target').val().length) {
        this.$el.find('div.discript').html(this.results[this.active].get('tarTarget').replace(/:target/, $('input.inputArea-target').val()));
      } else {
        this.$el.find('div.discript').html(this.results[this.active].get('tarNone'));
      }
    }
  });
  return Emotion;
});