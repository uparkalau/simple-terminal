import SimpleTerminal from "./SimpleTerminal";

const terminal = new SimpleTerminal("#terminal");

// Register 'echo' command
terminal.registerCommand("echo", (...args: string[]) => {
  terminal.echo(args.join(" "));
});

// Register 'clear' command
terminal.registerCommand("clear", () => {
  terminal.clear();
});

// Register 'help' command
terminal.registerCommand("help", () => {
  terminal.echo(
    "List of available commands: clear, help, ls, events, and echo"
  );
});

// Register 'ls' command
terminal.registerCommand("ls", (path: string = "/") => {
  const content = terminal.getFileContent(path);
  if (content) {
    terminal.echo(content);
  } else {
    terminal.echo(`No such directory: ${path}`);
  }
});

// // Register 'events' command
// terminal.registerCommand("events", async () => {
//   await terminal.events();
// });
