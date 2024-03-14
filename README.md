# Custom Actions extension

Custom keyboard actions for chrome

## Actions

* Ctrl+Up: Duplicate the current tab
* Ctrl+Left: Move the current tab left
* Ctrl+Right: Move the current tab right

## How it works

The keyup and keydown event listeners are loaded in a content script (scripts/script.js) which is declared in the manifest under 'content_scripts'.

When key events are detected, the content script sends actions through messages to the service worker (scripts/sw.js) which is registered in the manifest under 'background > service_worker.'