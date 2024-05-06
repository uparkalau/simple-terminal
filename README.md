# SimpleTerminal

SimpleTerminal is a lightweight, TypeScript-based terminal emulator for web applications. It provides a simple and intuitive API for creating custom terminal commands and handling user input.

## Features

- **Lightweight**: A minimalistic terminal emulator without the overhead of larger libraries.
- **TypeScript Support**: Written in TypeScript for better type safety and developer experience.
- **Custom Commands**: Easily register and handle custom terminal commands.
- **Simple API**: A straightforward API that's easy to use and integrate into any web project.

## Installation

Install SimpleTerminal using npm:

```bash
npm install simple-terminal
```

Or using yarn:

```bash
yarn add simple-terminal
```

# Usage
Here’s a quick example to get you started with SimpleTerminal:

### TypeScript
```
import SimpleTerminal from 'simple-terminal';

// Create a new terminal instance targeting the '#terminal' element
const terminal = new SimpleTerminal('#terminal');

// Register a simple 'echo' command
terminal.registerCommand('echo', (...args: string[]) => {
  terminal.echo(args.join(' '));
});

// Initialize the terminal (typically done when the DOM is fully loaded)
document.addEventListener('DOMContentLoaded', () => {
  terminal.init();
});
```
 Make sure your HTML includes an element with the id terminal:

### HTML
```
<div id="terminal"></div>
```
## API
```
registerCommand(name: string, func: CommandFunction): void
```
Register a new command with the terminal.
```
echo(message: string): void
```
Display a message in the terminal.

## Contributing
Contributions are welcome! Please feel free to submit issues, fork the repository and send pull requests!