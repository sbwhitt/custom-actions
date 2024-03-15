import { getActive } from "../modules/state.js";

chrome.runtime.onMessage.addListener(
  function (msg) {
    getActive((active: boolean) => {
      if (active) handleActions(msg.action);
    });
  }
);

function handleActions(action: string) {
  if (action === "tab-left") moveCurrentTabLeft();
  if (action === "tab-right") moveCurrentTabRight();
  if (action === "duplicate") duplicateTab();
}

function getCurrentTab(callback: Function) {
  let queryOptions = { active: true, lastFocusedWindow: true };
  chrome.tabs.query(queryOptions, ([tab]) => {
    if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
    callback(tab);
  });
}

// function sendMessage(msg) {
//   getCurrentTab((tab) => {
//     chrome.tabs.sendMessage(tab.id, msg);
//   });
// }

function moveCurrentTabLeft() {
  getCurrentTab(async (tab: any) => {
    const tabs = await chrome.tabs.query({});
    const numTabs = tabs.length;
    let newIndex;
    if (tab.index === 0) newIndex = numTabs;
    else newIndex = tab.index - 1;
    chrome.tabs.move(tab.id, { index: newIndex });
  });
}

function moveCurrentTabRight() {
  getCurrentTab(async (tab: chrome.tabs.Tab) => {
    const tabs = await chrome.tabs.query({});
    const numTabs = tabs.length;
    let newIndex;
    if (tab.index+1 === numTabs) newIndex = 0;
    else newIndex = tab.index + 1;
    chrome.tabs.move(tab.id ? tab.id : 0, { index: newIndex });
  });
}

function duplicateTab() {
  getCurrentTab((tab: chrome.tabs.Tab) => {
    chrome.tabs.create({
      url: tab.url
    });
  });
}
