import { Position, Range, TextEditor, window } from 'vscode';

import { ISwitchOptions } from './extension';

/**
 * get range of indent target
 *
 * @export
 * @param {TextEditor} editor
 * @param {RegExp} regex
 * @param {ISwitchOptions} pattern
 * @returns {Range[]}
 */
export function getRange(editor: TextEditor, regex: RegExp, pattern: ISwitchOptions): Range[] {
    const lineRegex = /[^|\n].*/g;
    const document = editor.document;
    const source = document.getText();
    let line = 0;

    const matches: Range[] = [];

    while (true) {
        const match = lineRegex.exec(source);

        if (!match) {
            break;
        }

        const isValid = regex.test(match[0]);

        console.log('isValid & match: ', regex, match, isValid);
        if (isValid) {
            matches.push(new Range(new Position(line, 0), new Position(line, pattern.from)));
        }

        line ++;
    }

    console.log('matches in getRange: ', matches);

    return matches;
}
