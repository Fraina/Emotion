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
      'keyup input.inputArea-search': 'tagSearch',
      'keyup input.inputArea-target': 'setTarget',
      'click span[data-index]': 'tagActive'
    },

    initialize: function() {
      this.$el.html(this.template);
      this.collection.fetch();

      this.results = '';
      this.active = '';
      this.targetName = '';

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

    tagSearch: function(e) {
      this.$el.find('div.emotions').html('<p>emotion tags</p>');
      this.results = this.collection.filterValues($(e.target).val());

      var resultsLength = this.results.length;
      for (var i = 0; i < resultsLength; i++) {
        this.$el.find('div.emotions').append('<span class="mrm" data-index="' + i + '" style="background: #e0e0e0">' + this.results[i].get('command') + '</span>')
      }
    },

    setTarget: function(e) {
      this.targetName = $(e.target).val();
      if (this.active) {
        this.render();
      }
    },

    tagActive: function(e) {
      this.active = this.results[$(e.target).attr('data-index')];
      this.render();
    },

    render: function() {
      if (this.targetName.length) {
        this.$el.find('div.discript').html(this.active.get('tarTarget').replace(/:target/, $('input.inputArea-target').val()));
      } else {
        this.$el.find('div.discript').html(this.active.get('tarNone'));
      }
    }
  });

  return Emotion;
});