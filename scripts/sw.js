chrome.runtime.onMessage.addListener(
  function (msg) {
    getActive((active) => {
      if (active) handleActions(msg.action);
    });
  }
);

function handleActions(action) {
  if (action === "tab-left") moveCurrentTabLeft();
  if (action === "tab-right") moveCurrentTabRight();
  if (action === "duplicate") duplicateTab();
}

function getActive(callback) {
  chrome.storage.local.get(["active"]).then((val) => {
    if (val.active === undefined) {
      setActive(true).then(() => { callback(true) });
    }
    else callback(val.active);
  });
}

function setActive(val) {
  return chrome.storage.local.set({ active: val });
}

function getCurrentTab(callback) {
  let queryOptions = { active: true };
  chrome.tabs.query(queryOptions, ([tab]) => {
    if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
    callback(tab);
  });
}

function sendMessage(msg) {
  getCurrentTab((tab) => {
    chrome.tabs.sendMessage(tab.id, msg);
  });
}

function moveCurrentTabLeft() {
  getCurrentTab(async (tab) => {
    const tabs = await chrome.tabs.query({});
    const numTabs = tabs.length;
    let newIndex;
    if (tab.index === 0) newIndex = numTabs;
    else newIndex = tab.index - 1;
    chrome.tabs.move(tab.id, { index: newIndex });
  });
}

function moveCurrentTabRight() {
  getCurrentTab(async (tab) => {
    const tabs = await chrome.tabs.query({});
    const numTabs = tabs.length;
    let newIndex;
    if (tab.index+1 === numTabs) newIndex = 0;
    else newIndex = tab.index + 1;
    chrome.tabs.move(tab.id, { index: newIndex });
  });
}

function duplicateTab() {
  getCurrentTab((tab) => {
    chrome.tabs.create({
      url: tab.url
    });
  });
}
