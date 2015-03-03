(function(factory) {
  'use strict';
  define([
    'jquery',
    'underscore',
    'backbone',
    'models/item'
  ], factory);
})(function($, _, Backbone, Model) {
  'use strict';
  var EmotionCollcetion = Backbone.Collection.extend({
    model: Model,
    url: 'js/collections/data.json',
    filterValues: function(filterValue) {
      if (filterValue == "") return [];
      return this.filter(function(data) {
        return _.some(_.values(data.toJSON()), function(value) {
          if (_.isNumber(value)) value = value.toString();
          if (_.isString(value)) return value.indexOf(filterValue) != -1;
          return false;
        });
      })
    }
  });
  return EmotionCollcetion;
});