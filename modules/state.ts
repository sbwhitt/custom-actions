export function getActive(callback: Function) {
  chrome.storage.local.get(["active"]).then((val) => {
    if (val["active"] === undefined) {
      setActive(true).then(() => { callback(true) });
    }
    else callback(val["active"]);
  });
}

export function setActive(val: boolean) {
  return chrome.storage.local.set({ active: val });
}
