import { Shortcut } from "./modules/types";
import { getShortcuts, setShortcuts } from "./modules/state";

var keyMap = new Map();

const s: Shortcut[] = [
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
  await setShortcuts(s);

  // working receive message from chrome.tabs.sendMessage
  chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
      console.log(message)
    }
  );

  document.addEventListener("keyup", (e) => {
    keyMap.set(e.code, false);
  });

  document.addEventListener("keydown", (e) => {
    keyMap.set(e.code, true);
    getShortcuts().then((res) => {
      handleShortcuts(res);
    })
  });

  document.addEventListener('visibilitychange', () => {
    keyMap = new Map();
  });
}

// TODO: double declaration because importing is highly illegal in here
// function setShortcuts(shortcuts: any[]) {
//   return chrome.storage.local.set({ shortcuts: shortcuts });
// }

// function getShortcuts() {
//   return chrome.storage.local.get(["shortcuts"]).then((val) => {
//     return val["shortcuts"];
//   });
// }

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
