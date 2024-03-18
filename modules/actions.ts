export function getCurrentTab(callback: Function) {
  const queryOptions = { active: true, lastFocusedWindow: true };
  try {
    chrome.tabs.query(queryOptions, ([tab]) => {
      callback(tab);
    });
  } catch (err) {
    console.error("Error getting current tab: ", err);
    if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
  }
}

export function sendMessageToCurrentTab(msg: any) {
  getCurrentTab((tab: chrome.tabs.Tab) => {
    if (tab.id) chrome.tabs.sendMessage(tab.id, msg);
  });
}

export function openTab(url: string | undefined) {
  try {
    chrome.tabs.create({
      url: url
    });
  } catch (err) {
    console.error("Error creating new tab: ", err);
    if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
  }
}

export function moveCurrentTabLeft() {
  getCurrentTab(async (tab: any) => {
    const tabs = await chrome.tabs.query({});
    const numTabs = tabs.length;
    let newIndex;
    if (tab.index === 0) newIndex = numTabs;
    else newIndex = tab.index - 1;
    chrome.tabs.move(tab.id, { index: newIndex });
  });
}

export function moveCurrentTabRight() {
  getCurrentTab(async (tab: chrome.tabs.Tab) => {
    const tabs = await chrome.tabs.query({});
    const numTabs = tabs.length;
    let newIndex;
    if (tab.index + 1 === numTabs) newIndex = 0;
    else newIndex = tab.index + 1;
    chrome.tabs.move(tab.id ? tab.id : 0, { index: newIndex });
  });
}

export function duplicateCurrentTab() {
  getCurrentTab((tab: chrome.tabs.Tab) => {
    openTab(tab.url);
  });
}

export function promoteCurrentTab() {
  getCurrentTab((tab: chrome.tabs.Tab) => {
    const data: chrome.windows.CreateData = {
      tabId: tab.id
    }
    return chrome.windows.create(data);
  });
}

export function openLastLocation() {
  chrome.history.search({ text: "", maxResults: 2 }).then((items) => {
    if (items[1]) openTab(items[1].url);
  });
}

// export async function collapseWindows() {
//   const windows = await chrome.windows.getAll();
//   for (let i = 1; i < windows.length; i++) {
//     const win = windows[i];
//     for (let tab of win.tabs || []) {
//       console.log(tab);
//       if (win.id && tab.id) await chrome.tabs.move(tab.id, { 
//         index: windows[0].tabs ? windows[0].tabs.length : 0,
//         windowId: win.id
//       });
//     }
//   }
// }
