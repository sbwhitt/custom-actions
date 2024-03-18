interface Shortcut {
  sequence: string[];
  action: string;
}

var keyMap = new Map();

const s: Shortcut[] = [
  {
    sequence: ["ControlLeft", "ArrowLeft"],
    action: "tab-left"
  },
  {
    sequence: ["ControlLeft", "ArrowRight"],
    action: "tab-right"
  },
  {
    sequence: ["ControlLeft", "ArrowUp"],
    action: "duplicate"
  },
  {
    sequence: ["ControlLeft", "ArrowDown"],
    action: "promote"
  },
  {
    sequence: ["AltLeft", "ShiftLeft", "ArrowLeft"],
    action: "open-last"
  },
  // {
  //   sequence: ["AltLeft", "ArrowDown"],
  //   action: "collapse"
  // }
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
function setShortcuts(shortcuts: any[]) {
  return chrome.storage.local.set({ shortcuts: shortcuts });
}

function getShortcuts() {
  return chrome.storage.local.get(["shortcuts"]).then((val) => {
    return val["shortcuts"];
  });
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
