import { Action, Shortcut } from "./modules/types";
import { getShortcuts, setShortcuts } from "./modules/state";
import { KeyMap } from "./modules/keymap";

const keyMap = new KeyMap();

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

  await initMessageListener();

  document.addEventListener("keyup", (e) => {
    keyMap.handleUp(e.code);
  });

  document.addEventListener("keydown", (e) => {
    keyMap.handleDown(e.code);
    try {
      getShortcuts().then((res) => {
        handleShortcuts(res);
      });
    } catch (err) {
      // eating 'Extension context invalidated' errors
      return;
    }
  });

  // reset keys when tab is switched
  document.addEventListener('visibilitychange', () => {
    keyMap.reset();
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
    console.error("Error checking stored shortcuts: ", err);
  }
}

function sendMessageToExtension(msg: any) {
  return chrome.runtime.sendMessage(msg);
}

async function initMessageListener() {
  try {
    chrome.runtime.onMessage.addListener((msg: { type: string, action: Action }) => {
      if (msg.type === "test") {
        sendMessageToExtension({ action: msg.action });
      }
    });
  } catch (err) {
    console.error(err);
  }
}

function handleShortcuts(shortcuts: Shortcut[]) {
  for (let s of shortcuts) {
    if (s.sequence.length !== keyMap.numDown) continue;
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

init();
