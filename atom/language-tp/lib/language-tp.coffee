LanguageTpView = require './language-tp-view'
{CompositeDisposable} = require 'atom'

module.exports = LanguageTp =
  languageTpView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @languageTpView = new LanguageTpView(state.languageTpViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @languageTpView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'language-tp:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @languageTpView.destroy()

  serialize: ->
    languageTpViewState: @languageTpView.serialize()

  toggle: ->
    console.log 'LanguageTp was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
