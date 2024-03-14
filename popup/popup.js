var enabled = true;

document.addEventListener("DOMContentLoaded", () => {
  const powerIcon = document.getElementById("powerIcon");
  console.log(powerIcon);
  powerIcon.addEventListener("click", (e) => {
    // TODO: need to store enabled value, gets reset to true every time extension popup reopens
    // enabled = !enabled;
    // sendMessage({ enabled: enabled });
    if (!enabled) document.getElementById("powerIconPath").setAttribute("fill", "gray");
    else document.getElementById("powerIconPath").setAttribute("fill", "blue");
  });
});

function sendMessage(msg) {
  getCurrentTab((tab) => {
    chrome.tabs.sendMessage(tab.id, msg);
  });
}

function getCurrentTab(callback) {
  let queryOptions = { active: true };
  chrome.tabs.query(queryOptions, ([tab]) => {
    if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
    callback(tab);
  });
}
