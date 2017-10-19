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
export function getRange(editor: TextEditor, pattern: ISwitchOptions): Array<{
    range: Range;
    indents: number;
}> {
    // const lineRegex = /\n.*/g;
    const regex = /^\s+/;
    const document = editor.document;
    const source = document.getText();

    const matches = [];

    source.split('\n').forEach((line, index) => {
        const match = regex.exec(line);
        const spaceNumber = match && match[0] && match[0].length;
        const indents = Math.floor(spaceNumber / pattern.from);

        if (spaceNumber) {
            matches.push({
                range: new Range(new Position(index, 0), new Position(index, spaceNumber)),
                indents
            });
        }
    });

    return matches;
}

/**
 * get spaces for replacement
 *
 * @export
 * @param {string} target
 * @param {number} indents
 * @returns {string}
 */
export function getSpaces(target: string, indents: number): string {
    let res = '';

    for (let i = 0; i < indents; i++) {
        res += target;
    }

    return res;
}
