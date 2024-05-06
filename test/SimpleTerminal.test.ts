import SimpleTerminal from "../src/SimpleTerminal";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("SimpleTerminal", () => {
  let terminal: SimpleTerminal;
  const mockSelector = "#terminal";
  const mockElement = document.createElement("div");
  mockElement.id = "terminal";

  beforeEach(() => {
    jest.clearAllMocks();
    document.body.appendChild(mockElement);
    terminal = new SimpleTerminal(mockSelector);
  });

  afterEach(() => {
    document.body.removeChild(mockElement);
    // Clean up DOM element after each test
    if (mockElement.parentNode) {
      mockElement.parentNode.removeChild(mockElement);
    }
  });

  test("constructor should throw an error if element is not found", () => {
    expect(() => new SimpleTerminal("#nonexistent")).toThrow();
  });

  test("echo should append message to terminalElement", () => {
    const message = "Test message";
    terminal.echo(message);
    expect(mockElement.textContent).toContain(message);
  });

  test("clear should remove content from terminalElement", () => {
    terminal.echo("Test message");
    terminal.clear();
    expect(mockElement.innerHTML).toBe("");
  });

  test("help should display available commands", () => {
    terminal.help();
    expect(mockElement.textContent).toContain("List of available commands:");
  });

  test("ls should list directory contents", () => {
    terminal.ls("/");
    expect(mockElement.textContent).toContain("home, projects, documents");
  });

  test("cd should change directory", () => {
    const path = "/home";
    terminal.cd(path);
    expect(mockElement.textContent).toContain(`Changed directory to ${path}`);
  });

  test("events should fetch and display events", async () => {
    const mockEventsData = {
      data: {
        features: [
          {
            properties: {
              title: "Event 1",
              date: new Date().toISOString(),
            },
          },
          {
            properties: {
              title: "Event 2",
              date: new Date().toISOString(),
            },
          },
        ],
      },
    };
    mockedAxios.get.mockResolvedValueOnce(mockEventsData);

    await terminal.events();
    expect(mockElement.textContent).toContain("Event 1");
    expect(mockElement.textContent).toContain("Event 2");
  });

  test("registerCommand should add new command", () => {
    const newCommand = jest.fn();
    terminal.registerCommand("newCommand", newCommand);
    terminal.processCommand("newCommand");
    expect(newCommand).toHaveBeenCalled();
  });

  test("processCommand should handle unknown commands", () => {
    terminal.processCommand("unknownCommand");
    expect(mockElement.textContent).toContain(
      "Command not found: unknownCommand"
    );
  });

  test("registerCommand should allow execution of a new command", () => {
    const mockCommandFunction = jest.fn();
    terminal.registerCommand("mockCommand", mockCommandFunction);

    // Simulate user input that triggers the new command
    terminal.processCommand("mockCommand");

    // Verify that the new command was executed
    expect(mockCommandFunction).toHaveBeenCalled();
  });

  test("registered command should be callable", () => {
    const mockCommandFunction = jest.fn();
    terminal.registerCommand("mockCommand", mockCommandFunction);

    terminal.processCommand("mockCommand");
    expect(mockCommandFunction).toHaveBeenCalled();
  });

  test("registered command should execute with correct arguments", () => {
    const mockCommandFunction = jest.fn();
    terminal.registerCommand("mockCommand", mockCommandFunction);

    terminal.processCommand("mockCommand arg1 arg2");
    expect(mockCommandFunction).toHaveBeenCalledWith("arg1", "arg2");
  });
});
