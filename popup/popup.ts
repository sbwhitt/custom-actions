import { getActive, setActive } from "../modules/state.js";

document.addEventListener("DOMContentLoaded", () => {
  const powerIcon = document.getElementById("powerIcon");
  // initialize power icon state
  getActive((active: boolean) => {
    handlePowerIcon(active);
  });
  powerIcon?.addEventListener("click", (e) => {
    getActive((active: boolean) => {
      handlePowerIcon(!active);
      setActive(!active);
    });
  });
});

function handlePowerIcon(active: boolean) {
  if (!active) {
    document.getElementById("powerIconPath")?.setAttribute("fill", "gray");
  }
  else {
    document.getElementById("powerIconPath")?.setAttribute("fill", "blue");
  }
}
