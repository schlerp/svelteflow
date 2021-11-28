import type { BrowserJsPlumbInstance } from "@jsplumb/browser-ui";

export function setZoom(
  zoom: number,
  instance: BrowserJsPlumbInstance,
  transformOrigin = [0.0, 0.0]
) {
  let el = instance.getContainer();
  let s = `scale(${zoom})`;
  let oString = transformOrigin[0] + "% " + transformOrigin[1] + "%";

  el.style["transform"] = s;
  el.style["transformOrigin"] = oString;
  el.style["height"] = 100 / zoom + "%";
  el.style["width"] = 100 / zoom + "%";

  instance.setZoom(zoom, true);
}

export function panElements(
  el: HTMLDivElement,
  deltaX: number,
  deltaY: number
) {
  Array.from(el.children as HTMLCollectionOf<HTMLElement>).forEach((child) => {
    const style = getComputedStyle(child);
    const top = parseInt(style["top"]) | 0;
    const left = parseInt(style["left"]) | 0;
    child.style["left"] = `${left + deltaX}px`;
    child.style["top"] = `${top + deltaY}px`;
  });
}
