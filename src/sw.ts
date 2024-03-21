import { Action } from "./modules/types";
import { getActive } from "./modules/state";
import {
  moveCurrentTabLeft,
  moveCurrentTabRight,
  duplicateCurrentTab,
  promoteCurrentTab,
  openLastLocation,
  collapseWindows
} from "./modules/actions";

interface ActionMessage {
  action: Action;
}

console.log("service worker");

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

function handleActions(action: Action) {
  if (action.name === "tab-left") moveCurrentTabLeft();
  else if (action.name === "tab-right") moveCurrentTabRight();
  else if (action.name === "duplicate") duplicateCurrentTab();
  else if (action.name === "promote") promoteCurrentTab();
  else if (action.name === "open-last") openLastLocation();
  else if (action.name === "collapse") collapseWindows();
}

init();
