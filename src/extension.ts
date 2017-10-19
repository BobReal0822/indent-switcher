// The module 'vscode' contains the VS Code extensibility API
// Import the necessary extensibility types to use in your code below
import { commands, Disposable, ExtensionContext, Position, Range, StatusBarAlignment, StatusBarItem, TextDocument, window, workspace} from 'vscode';

import { getRange } from './match';

export interface ISwitchOptions {
    from: number;
    to: number;
}

const SwitchFrom4To2: ISwitchOptions = {
    from: 4,
    to: 2
};

const SwitchFrom2To4: ISwitchOptions = {
    from: 2,
    to: 4
};

const languages = [
    'javascript',
    'javascriptreact',
    'typescript',
    'typescriptreact',
    'vue'
];

// This method is called when your extension is activated. Activation is
// controlled by the activation events defined in package.json.
export function activate(context: ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error).
    // This line of code will only be executed once when your extension is activated.
    console.log('Congratulations, your extension "WordCount" is now active!');

    // create a new word counter
    const indentManager = new IndentManager();

    const config = workspace.getConfiguration();
    commands.registerTextEditorCommand('extension.si42', (editor, edit) => {
        indentManager.switchIndent(SwitchFrom4To2);
    });
    const si24 = commands.registerCommand('extension.si24', () => {
        indentManager.switchIndent(SwitchFrom2To4);
    });
}

class IndentManager {
    public switchIndent(options: ISwitchOptions) {
        const editor = window.activeTextEditor;
        const document = editor.document;
        const language = document.languageId;

        if (!editor) {
            window.showErrorMessage('No file is open!');

            return;
        }

        if (languages.indexOf(language) >= 0) {
            window.showErrorMessage(`Language don't support: ${ language }`);
        }

        try {
            const ranges = getRange(editor, options === SwitchFrom2To4 ? /^\s{2}\S+/ : /^\s{4}\S+/, options);

            editor.edit(edit => {
                for (const range of ranges) {
                    edit.replace(range, options === SwitchFrom2To4 ? '    ' : '  ');
                }
            });

            editor.document.save();
        } catch (err) {
            window.showErrorMessage(`Indent switch error ${ err }`);
        }
    }
}
