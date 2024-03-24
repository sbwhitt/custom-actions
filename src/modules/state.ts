import { Shortcut } from "./types";

export function setActive(
  val: boolean,
  setIcon: boolean = true
): Promise<boolean> {
  return chrome.storage.local.set({ active: val }).then(() => {
    if (setIcon) {
      const path = val ?
        { path: "assets/icon_38.png" } : { path: "assets/icon_disabled_38.png" };
      chrome.action.setIcon(path);
    }
    return val;
  });
}

export function getActive(): Promise<boolean> {
  return chrome.storage.local.get(["active"]).then((val) => {
    if (val["active"] === undefined) {
      return setActive(true).then((active) => active);
    }
    return val["active"];
  });
}

export function setShortcuts(shortcuts: Shortcut[]) {
  return chrome.storage.local.set({ shortcuts: shortcuts });
}

export function getShortcuts(): Promise<Shortcut[]> {
  return chrome.storage.local.get(["shortcuts"]).then((val: any) => {
    return val["shortcuts"];
  });
}
