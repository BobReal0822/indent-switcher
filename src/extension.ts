// The module 'vscode' contains the VS Code extensibility API
// Import the necessary extensibility types to use in your code below
import { commands, Disposable, ExtensionContext, Position, Range, StatusBarAlignment, StatusBarItem, TextDocument, window, workspace} from 'vscode';

import { getRange, getSpaces } from './match';

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
    console.log('Congratulations, your extension "IndentSwitcher" is now active!');

    // create a new word counter
    const indentManager = new IndentManager();

    const config = workspace.getConfiguration();
    commands.registerTextEditorCommand('indentSwitcher.si4to2', (editor, edit) => {
        indentManager.switchIndent(SwitchFrom4To2);
    });
    const si24 = commands.registerCommand('indentSwitcher.si2to4', () => {
        indentManager.switchIndent(SwitchFrom2To4);
    });
}

/**
 * indent manager for commands
 *
 * @class IndentManager
 */
class IndentManager {
    public switchIndent(options: ISwitchOptions) {
        const editor = window.activeTextEditor;
        const document = editor.document;
        const language = document.languageId;

        if (!editor) {
            window.showErrorMessage('No file is open!');

            return;
        }

        if (languages.indexOf(language) < 0) {
            window.showErrorMessage(`Language don't support: ${ language }`);
        }

        try {
            const matches = getRange(editor, options);

            editor.edit(edit => {
                for (const match of matches) {
                    const { range, indents } = match;
                    const value = getSpaces(options === SwitchFrom2To4 ? '    ' : '  ', indents);

                    edit.replace(range, value);
                }
            });

            editor.document.save();
        } catch (err) {
            window.showErrorMessage(`Indent switch error ${ err }`);
        }
    }
}
