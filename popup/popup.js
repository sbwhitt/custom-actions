document.addEventListener("DOMContentLoaded", () => {
  const powerIcon = document.getElementById("powerIcon");
  // initialize power icon state
  getActive((active) => {
    handlePowerIcon(active);
  });
  powerIcon.addEventListener("click", (e) => {
    getActive((active) => {
      handlePowerIcon(!active);
      setActive(!active);
    });
  });
});

function handlePowerIcon(active) {
  if (!active) {
    document.getElementById("powerIconPath").setAttribute("fill", "gray");
  }
  else {
    document.getElementById("powerIconPath").setAttribute("fill", "blue");
  }
}

function getActive(callback) {
  chrome.storage.local.get(["active"]).then((val) => {
    callback(val.active);
  });
}

function setActive(val) {
  return chrome.storage.local.set({ active: val });
}
