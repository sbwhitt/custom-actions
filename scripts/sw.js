chrome.runtime.onMessage.addListener(
  function (msg) {
    if (msg.action === "tab-left") moveCurrentTabLeft();
    if (msg.action === "tab-right") moveCurrentTabRight();
    if (msg.action === "duplicate") duplicateTab();
  }
);

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
