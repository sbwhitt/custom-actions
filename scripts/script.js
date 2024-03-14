console.log("content script loaded");

// working receive message from chrome.tabs.sendMessage
// chrome.runtime.onMessage.addListener(
//   function(message, sender, sendResponse) {
//     console.log("MESSAGE: ", message);
//     console.log(sender);
//     console.log(sendResponse);
//     sendMessageToExtension();
//   }
// );

var ctrl = false;

document.addEventListener("keydown", (e) => {
  if (e.code === "ControlLeft") ctrl = true;
  if (ctrl && e.code === "ArrowLeft") sendMessageToExtension({ action: "tab-left" });
  if (ctrl && e.code === "ArrowRight") sendMessageToExtension({ action: "tab-right" });
});

document.addEventListener("keyup", (e) => {
  if (e.code === "ControlLeft") ctrl = false;
});

function sendMessageToExtension(msg) {
  chrome.runtime.sendMessage(msg);
}