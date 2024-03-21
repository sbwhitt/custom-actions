export function setActive(val: boolean) {
  return chrome.storage.local.set({ active: val });
}

export function getActive(callback: Function) {
  chrome.storage.local.get(["active"]).then((val) => {
    if (val["active"] === undefined) {
      setActive(true).then(() => { callback(true) });
    }
    else callback(val["active"]);
  });
}

export function setShortcuts(shortcuts: any[]) {
  return chrome.storage.local.set({ shortcuts: shortcuts });
}

export function getShortcuts() {
  return chrome.storage.local.get(["shortcuts"]).then((val: any) => {
    return val["shortcuts"];
  });
}
