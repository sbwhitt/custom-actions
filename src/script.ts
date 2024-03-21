import { Shortcut } from "./modules/types";
import { getShortcuts, setShortcuts } from "./modules/state";

var keyMap = new Map();

const defaults: Shortcut[] = [
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

async function init() {
  await checkStoredShortcuts();

  document.addEventListener("keyup", (e) => {
    keyMap.set(e.code, false);
  });

  document.addEventListener("keydown", (e) => {
    keyMap.set(e.code, true);
    try {
      getShortcuts().then((res) => {
        handleShortcuts(res);
      });
    } catch (err) {
      console.log(err);
    }
  });

  document.addEventListener('visibilitychange', () => {
    keyMap = new Map();
  });
}

async function checkStoredShortcuts() {
  try {
    getShortcuts().then(async (res) => {
      if (!res) {
        await setShortcuts(defaults);
      }
    });
  } catch (err) {
    console.error(err);
  }
}

function handleShortcuts(shortcuts: Shortcut[]) {
  for (let s of shortcuts) {
    let active = true;
    for (let key of s.sequence) {
      if (!keyMap.get(key)) {
        active = false;
        break;
      }
    }
    if (active) {
      sendMessageToExtension({ action: s.action });
      return;
    }
  }
}

function sendMessageToExtension(msg: any) {
  chrome.runtime.sendMessage(msg);
}

init();
