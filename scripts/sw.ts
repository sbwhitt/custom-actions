import { getActive } from "../modules/state.js";
import {
  moveCurrentTabLeft,
  moveCurrentTabRight,
  duplicateCurrentTab,
  promoteCurrentTab,
  openLastLocation,
  // collapseWindows
} from "../modules/actions.js";

interface ActionMessage {
  action: string;
}

function init() {
  try {
    chrome.runtime.onMessage.addListener(
      function (msg: ActionMessage) {
        getActive((active: boolean) => {
          if (active) handleActions(msg.action);
        });
      }
    );
  } catch (err) {
    console.error("Error initializing service worker: ", err);
    if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
  }
}

function handleActions(action: string) {
  if (action === "tab-left") moveCurrentTabLeft();
  else if (action === "tab-right") moveCurrentTabRight();
  else if (action === "duplicate") duplicateCurrentTab();
  else if (action === "promote") promoteCurrentTab();
  else if (action === "open-last") openLastLocation();
  // else if (action === "collapse") collapseWindows();
}

init();
