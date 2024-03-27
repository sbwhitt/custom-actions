import { Action, Shortcut } from "./modules/types";
import { getShortcuts, setShortcuts } from "./modules/state";
import { KeyMap } from "./modules/keymap";
import { defaults } from "./modules/defaults";

function sendMessageToExtension(msg: any) {
  return chrome.runtime.sendMessage(msg);
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

async function addEventListeners() {
  document.addEventListener("keydown", async (e) => {
    keyMap.handleDown(e.code);
    try {
      await getShortcuts().then((res) => {
        handleShortcuts(res);
      });
    } catch (err) {
      // eating 'Extension context invalidated' errors
      return;
    }
  });
  
  document.addEventListener("keyup", (e) => {
    keyMap.handleUp(e.code);
  });

  // reset keys when tab is switched
  document.addEventListener("visibilitychange", () => {
    keyMap.reset();
  });
}

async function addMessageListener() {
  try {
    chrome.runtime.onMessage.addListener((msg: { type: string, action: Action }) => {
      if (msg.type === "test") {
        sendMessageToExtension({ action: msg.action, test: true });
      }
    });
  } catch (err) {
    console.error(err);
  }
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

async function init() {
  await checkStoredShortcuts();
  await addMessageListener();
  await addEventListeners();
}

const keyMap = new KeyMap();
init();
