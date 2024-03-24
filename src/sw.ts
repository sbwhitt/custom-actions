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

// https://stackoverflow.com/questions/10994324/chrome-extension-content-script-re-injection-after-upgrade-or-install/11598753#11598753
/*
Re-injects new content script (script.ts) to tabs after update/reload.
*/
function reInjectContentScript() {
  chrome.runtime.onInstalled.addListener(async () => {
    const scripts = chrome.runtime.getManifest().content_scripts;
    if (!scripts) return;
    const cs = scripts[0];
    for (const tab of await chrome.tabs.query({url: cs.matches})) {
      if (tab?.url?.startsWith("chrome://")) continue;
      chrome.scripting.executeScript({
        files: cs.js ? cs.js : [],
        target: {
          tabId: tab.id ? tab.id : 0,
          allFrames: cs.all_frames
        },
        injectImmediately: cs.run_at === 'document_start',
      });
    }
  });
}

function init() {
  reInjectContentScript();
  try {
    chrome.runtime.onMessage.addListener(
      function (msg: ActionMessage) {
        getActive().then((active) => {
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
