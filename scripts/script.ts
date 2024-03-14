console.log("content script loaded");

var ctrl = false;

// working receive message from chrome.tabs.sendMessage
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    console.log(message)
  }
);

document.addEventListener("keyup", (e) => {
  if (e.code === "ControlLeft") ctrl = false;
});

document.addEventListener("keydown", (e) => {
  if (e.code === "ControlLeft") ctrl = true;
  else if (ctrl && e.code === "ArrowLeft") sendMessageToExtension({ action: "tab-left" });
  else if (ctrl && e.code === "ArrowRight") sendMessageToExtension({ action: "tab-right" });
  else if (ctrl && e.code === "ArrowUp") sendMessageToExtension({ action: "duplicate" });
});

function sendMessageToExtension(msg: any) {
  chrome.runtime.sendMessage(msg);
}