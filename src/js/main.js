/*global requirejs*/
requirejs.config({

  paths: {
    jquery: '../bower/jquery/dist/jquery.min',
    underscore: '../bower/underscore/underscore-min',
    backbone: '../bower/backbone/backbone',
    i18n: '../bower/requirejs-i18n/i18n',
    text: '../bower/requirejs-text/text',
    backstretch: '../bower/jquery-backstretch/jquery.backstretch.min',
    mock: '../bower/mockjs/dist/mock'
  },

  shim: {
    underscore: {
      exports: '_'
    },

    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },

    backstretch: {
      deps: ['jquery']
    }
  }
});

require([
  'jquery',
  'underscore',
  'backbone',
  'views/emotion'
], function ($, _, Backbone, Emotion) {

  'use strict';

  new Emotion({ el: '#wrapper' });

  Backbone.history.start();
});
