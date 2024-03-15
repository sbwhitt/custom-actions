var modifiers = {
  leftCtrl: false,
  leftAlt: false,
  leftShift: false
};

// working receive message from chrome.tabs.sendMessage
chrome.runtime.onMessage.addListener(
  function (message, sender, sendResponse) {
    console.log(message)
  }
);

document.addEventListener("keyup", (e) => {
  if (e.code === "ControlLeft") modifiers.leftCtrl = false;
  else if (e.code === "AltLeft") modifiers.leftAlt = false;
  else if (e.code === "ShiftLeft") modifiers.leftShift = false;
});

document.addEventListener("keydown", (e) => {
  if (e.code === "ControlLeft") modifiers.leftCtrl = true;
  else if (e.code === "AltLeft") modifiers.leftAlt = true;
  else if (e.code === "ShiftLeft") modifiers.leftShift = true;
  else if (modifiers.leftCtrl && e.code === "ArrowLeft") sendMessageToExtension({ action: "tab-left" });
  else if (modifiers.leftCtrl && e.code === "ArrowRight") sendMessageToExtension({ action: "tab-right" });
  else if (modifiers.leftCtrl && e.code === "ArrowUp") sendMessageToExtension({ action: "duplicate" });
  else if (modifiers.leftCtrl && e.code === "ArrowDown") sendMessageToExtension({ action: "promote" });
  else if (modifiers.leftAlt && modifiers.leftShift && e.code === "ArrowLeft") sendMessageToExtension({ action: "open-last" });
});

function sendMessageToExtension(msg: any) {
  chrome.runtime.sendMessage(msg);
}
