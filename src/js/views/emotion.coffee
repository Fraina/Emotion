define [
  'require'
  'jquery'
  'underscore'
  'backbone'
  'collections/items'
  'text!templates/emotion.html'
], (require) ->
  'use strict'

  $ = require('jquery')
  _ = require('underscore')
  Backbone = require('backbone')
  Collections = require('collections/items')
  Template = require('text!templates/emotion.html')

  Emotion = Backbone.View.extend
    collection: new Collections()
    template: Template
    events:
      'keyup input.inputArea-search': 'tagSearch'
      'keyup input.inputArea-target': 'setTarget'
      'click span[data-index]': 'tagActive'


    initialize: ->
      @$el.html(@template)
      @collection.fetch()

      @results = ''
      @active = ''
      @targetName = ''
      @searchKeyWord = ''
      @$discript = @$el.find 'div.discript'

      # MD input
      input = @$el.find 'input[class^=inputArea]'
      input
        .focus ->
          $(this).siblings('span').addClass 'is-focus'
        .blur ->
          if ($(this).val() == '')
            $(this).siblings('span').removeClass 'is-focus'
      return this


    tagSearch: (e) ->
      nowSearching = $(e.target).val()
      if nowSearching && nowSearching != this.searchKeyWord
        @searchKeyWord = nowSearching
        @results = @collection.filterValues($(e.target).val())

        i = 0
        resultsLength = @results.length
        frag = $(document.createDocumentFragment())
        for i in [0...resultsLength]
          node = $('<span class="tags mrm"></span>')
          node.attr('data-index', i).text(@results[i].get('command'))
          frag.append(node)
        @$el.find('div.emotions').empty().append frag


    setTarget: (e) ->
      @targetName = $(e.target).val()
      if @active
        @render()


    tagActive: (e) ->
      @active = @results[$(e.target).attr('data-index')]
      @render()


    render: ->
      if @targetName.length
        @$discript.html(@active.get('tarTarget').replace(/:target/, $('input.inputArea-target').val()))
      else
        @$discript.html(@active.get('tarNone'))
      return this

  Emotion