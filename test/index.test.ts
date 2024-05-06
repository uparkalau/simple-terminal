import SimpleTerminal from "../src/SimpleTerminal";
import mockEventsData from "./mockEventsData";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("SimpleTerminal", () => {
  let terminal: SimpleTerminal;

  beforeEach(() => {
    document.body.innerHTML = `<div id="terminal"></div>`;
    terminal = new SimpleTerminal("#terminal");
  });

  test("clear command should clear the terminal", () => {
    terminal.echo("Content before clear");
    terminal.clear();

    const terminalElement = document.querySelector("#terminal");
    if (terminalElement) {
      expect(terminalElement.innerHTML).toBe("");
    } else {
      fail("terminalElement is null");
    }
  });

  test("help command should display help message", () => {
    terminal.help();

    const terminalElement = document.querySelector("#terminal");
    if (terminalElement) {
      expect(terminalElement.textContent).toContain(
        "List of available commands:"
      );
    } else {
      fail("terminalElement is null");
    }
  });

  test("ls command should list directory contents", () => {
    terminal.ls("/");

    const terminalElement = document.querySelector("#terminal");
    if (terminalElement) {
      expect(terminalElement.textContent).toContain(
        "home, projects, documents"
      );
    } else {
      fail("terminalElement is null");
    }
  });

  test("events command should fetch and display events", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockEventsData });

    await terminal.events();

    const terminalElement = document.querySelector("#terminal");

    if (terminalElement) {
      const expectedOutput = mockEventsData.features
        .map((feature) => {
          const title = feature.properties.title;
          const date = new Date(feature.properties.date).toLocaleDateString(
            "en-US"
          );
          return `${title} - ${date}`;
        })
        .join("");

      expect(terminalElement.textContent).toContain(expectedOutput);
    } else {
      fail("terminalElement is null");
    }
  });
});
