// The module 'vscode' contains the VS Code extensibility API
// Import the necessary extensibility types to use in your code below
import { commands, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument, window} from 'vscode';

interface ISwitchOptions {
    from: number;
    to: number;
}

const SwithFrom4To2: ISwitchOptions = {
    from: 4,
    to: 2
};

const SwitchFrom2To4: ISwitchOptions = {
    from: 2,
    to: 4
};

// This method is called when your extension is activated. Activation is
// controlled by the activation events defined in package.json.
export function activate(context: ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error).
    // This line of code will only be executed once when your extension is activated.
    console.log('Congratulations, your extension "WordCount" is now active!');

    // create a new word counter
    const indentManager = new IndentManager();

    const si42 = commands.registerCommand('extension.si42', () => {
        // indentManager.switchIndent(SwithFrom4To2);
        window.showInformationMessage('si42 (indentSwitcher)');
    });
    const si24 = commands.registerCommand('extension.si24', () => {
        // indentManager.switchIndent(SwithFrom4To2);
        window.showInformationMessage('si24 (indentSwitcher)');
    });

    // Add to a list of disposables which are disposed when this extension is deactivated.
    context.subscriptions.push(si42);
    context.subscriptions.push(si24);
}

class IndentManager {

    public getIndent() {
        //
    }

    public switchIndent(options: ISwitchOptions) {
        //

    }
}
