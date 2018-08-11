'use strict';
const vscode = require("vscode");

const TP_MODE = {language: 'tp', scheme: 'file'};

function activate(context) {
    console.log('Fanuc-TP extension is now active.');

    let workspaceSymbolCompiler = new TpWorkspaceSymbolCompiler();
    let symbolController = new WorkspaceSymbolController(workspaceSymbolCompiler);
    context.subscriptions.push(workspaceSymbolCompiler);
    context.subscriptions.push(symbolController);

    let workspaceSymbolProvider = new TpWorkspaceSymbolProvider();
    context.subscriptions.push(workspaceSymbolProvider);
    context.subscriptions.push(vscode.languages.registerWorkspaceSymbolProvider(workspaceSymbolProvider));

    let completionItemProvider = new TpCompletionItemProvider();
    context.subscriptions.push(completionItemProvider);
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(TP_MODE, completionItemProvider, '.', '\"'));

    let signatureHelpProvider = new TpSignatureHelpProvider();
    context.subscriptions.push(signatureHelpProvider);
    context.subscriptions.push(vscode.languages.registerSignatureHelpProvider(TP_MODE, signatureHelpProvider, '(', ','));
}
exports.activate = activate;

function deactivate() {
    console.log('Fanuc-TP extension is now inactive.');
}
exports.deactivate = deactivate;

class WorkspaceSymbolController {

    constructor(symbolCompiler) {
        this._symbolCompiler = symbolCompiler;
        // this._symbolCompiler.updateSymbolLists();

        let subscriptions = [];
        vscode.workspace.onDidSaveTextDocument(this._onEvent, this, subscriptions);
        vscode.workspace.onDidOpenTextDocument(this._onEvent, this, subscriptions);

        this._symbolCompiler.updateSymbolLists();

        this._disposable = vscode.Disposable.from(...subscriptions);
    }

    dispose() {
        this._disposable.dispose();
    }

    _onEvent() {
        this._symbolCompiler.updateSymbolLists();
    }
}

class TpWorkspaceSymbolCompiler {
    constructor() {
        this._variables = [];
        this._functions = [];
    }

    updateSymbolLists() {
        console.log('updateSymbolLists called: ');
        vscode.workspace.findFiles('**/**','**/*.cfg').then(function(value){console.log(value)});
    }
}

class TpWorkspaceSymbolProvider {
    provideWorkspaceSymbols(query, token) {
        console.log('provideWorkspaceSymbols called: ' + query);
    }
}

class TpCompletionItemProvider {
    provideCompletionItems(document, position, token) {
        console.log('provideCompletionItems called: ');
    }
}

class TpSignatureHelpProvider {
    provideSignatureHelp(document, position, token) {
        console.log('provideSignatureHelp called: ')
    }
}
