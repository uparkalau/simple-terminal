import SimpleTerminal from '../../dist/SimpleTerminal.js';

const terminal = new SimpleTerminal("#terminal");

// Register commands
terminal.registerCommand("echo", (...args) => {
  terminal.echo(args.join(" "));
});

terminal.registerCommand("clear", () => {
  terminal.clear();
});

terminal.registerCommand("help", () => {
  terminal.echo("List of available commands: clear, help, ls, events, and echo");
});

terminal.registerCommand("ls", (path = "/") => {
  const content = terminal.getFileContent(path);
  if (content) {
    terminal.echo(content);
  } else {
    terminal.echo(`No such directory: ${path}`);
  }
});

terminal.registerCommand("events", async () => {
  await terminal.events();
});

// Handle input submission
document.getElementById("terminal-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const input = e.target.value;
    terminal.processCommand(input);
    e.target.value = "";
  }
});
