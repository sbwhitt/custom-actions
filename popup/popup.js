// on load
document.addEventListener("DOMContentLoaded", function () {
  const left = document.getElementById("left");
  left.addEventListener("click", function () {
    moveCurrentTabLeft();
  });

  const right = document.getElementById("right");
  right.addEventListener("click", function () {
    moveCurrentTabRight();
  });
});

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

function getCurrentTab(callback) {
  let queryOptions = { active: true };
  chrome.tabs.query(queryOptions, ([tab]) => {
    if (chrome.runtime.lastError)
    console.error(chrome.runtime.lastError);
    callback(tab);
  });
}
