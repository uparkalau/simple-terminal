import axios from "axios";
type CommandFunction = (...args: string[]) => void;

export default class SimpleTerminal{
  private terminalElement: HTMLElement;
  private commands: Record<string, CommandFunction> = {};
  private fileSystem: Record<string, string>;

  constructor(selector: string) {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`Element with selector "${selector}" not found.`);
    }
    this.terminalElement = element as HTMLElement;

    this.clear = this.clear.bind(this);
    this.help = this.help.bind(this);
    this.ls = this.ls.bind(this);
    this.events = this.events.bind(this);
    this.cd = this.cd.bind(this);
    this.echo = this.echo.bind(this);

    this.commands = {
      clear: this.clear,
      help: this.help,
      ls: this.ls,
      events: this.events,
      cd: this.cd,
      echo: this.echo,
    };

    this.fileSystem = {
      "/": "home, projects, documents",
      "/home": "readme.txt",
      "/projects": "simple-terminal",
      "/documents": "resume.pdf, cover-letter.docx",
    };

    this.initialize();
  }

  private initialize(): void {
    this.terminalElement.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        const input = (e.target as HTMLInputElement).value;
        this.processCommand(input);
        (e.target as HTMLInputElement).value = "";
      }
    });
  }

  public processCommand(input: string): void {
    const [commandName, ...args] = input.split(" ");
    const command = this.commands[commandName];

    if (command) {
      command(...args);
    } else {
      this.echo(`Command not found: ${commandName}`);
    }
  }

  public getFileContent = (path: string): string | undefined => {
    return this.fileSystem[path];
  };

  public echo(message: string): void {
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    this.terminalElement.appendChild(messageElement);
  }

  public registerCommand(name: string, func: CommandFunction): void {
    this.commands[name] = func;
  }

  public clear = (): void => {
    this.terminalElement.innerHTML = "";
  };

  public help = (): void => {
    const helpText =
      "List of available commands: clear, help, ls, cd, events, and echo";
    this.echo(helpText);
  };

  public ls = (path: string = "/"): void => {
    const content = this.fileSystem[path];
    if (content) {
      this.echo(content);
    } else {
      this.echo(`No such directory: ${path}`);
    }
  };

  public cd = (path: string): void => {
    this.echo(`Changed directory to ${path}`);
  };

  public events = async (): Promise<void> => {
    try {
      const response = await axios.get(
        "https://eonet.gsfc.nasa.gov/api/v3/events/geojson"
      );
      const features = response.data.features;
      const lastTwoEvents = features.slice(-2); // Get the last two events

      lastTwoEvents.forEach(
        (event: {
          properties: { title: any; date: string | number | Date };
        }) => {
          const title = event.properties.title;
          const date = new Date(event.properties.date).toLocaleDateString(
            "en-US"
          );
          this.echo(`${title} - ${date}`);
        }
      );
    } catch (error) {
      this.echo("Error fetching events.");
    }
  };
  
}
