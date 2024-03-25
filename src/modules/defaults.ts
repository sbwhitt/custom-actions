import { Shortcut } from "./types";

export const defaults: Shortcut[] = [
  {
    sequence: ["ControlLeft", "ArrowLeft"],
    action: {
      name: "tab-left",
      description: "Moves the current tab one position to the left."
    }
  },
  {
    sequence: ["ControlLeft", "ArrowRight"],
    action: {
      name: "tab-right",
      description: "Moves the current tab one position to the right."
    }
  },
  {
    sequence: ["ControlLeft", "ArrowUp"],
    action: {
      name: "duplicate",
      description: "Duplicates the current tab."
    }
  },
  {
    sequence: ["ControlLeft", "ArrowDown"],
    action: {
      name: "promote",
      description: "Promotes the current tab to its own window."
    }
  },
  {
    sequence: ["AltLeft", "ShiftLeft", "ArrowLeft"],
    action: {
      name: "open-last",
      description: "Opens the last visited page in a new tab."
    }
  },
  {
    sequence: ["AltLeft", "ArrowDown"],
    action: {
      name: "collapse",
      description: "Collapses all tabs in all windows into a single window."
    }
  }
];
