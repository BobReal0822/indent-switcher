# [indent-switcher](https://marketplace.visualstudio.com/items?itemName=ephoton.indent-switcher)

Switch indentations from 4 spaces to 2 spaces, or 2 to 4. [Rate](https://marketplace.visualstudio.com/items?itemName=ephoton.indent-switcher#review-details) if you like. [Issues](https://github.com/ephoton/indent-switcher/issues) are always welcomed.

## Features
![indent switcher](https://ephoton.github.io/indent-switcher/images/demo.gif)

## Install

`Ctrl/Cmd + P` in Visual Studio Code, then:

```sh
ext install indent-switcher
```

## Usage

You can use both command palette and keyboard shortcuts to switch indentations.

### Run with Command Palette

* Press `F1` or `Ctrl+Shift+P` for Command Palette
* Type or find "Switch indentations from 4(2) spaces to 2(4) spaces"

### Bind to keyboard shortcuts

* File > Preferences > Keyboard Shortcuts
* Append the following into `keybindings.json`

```js
    {
        "key": "ctrl+shift+2",
        "command": "indentSwitcher.si2to4",
        "when": "editorFocus"
    },
    {
        "key": "ctrl+shift+4",
        "command": "indentSwitcher.si4to2",
        "when": "editorFocus"
    }
```

## Commands

- `indentSwitcher.si4to2`
  Switch indentations from 4 spaces to 2 spaces.
- `indentSwitcher.si2to4`
  Switch indentations from 2 spaces to 4 spaces.
