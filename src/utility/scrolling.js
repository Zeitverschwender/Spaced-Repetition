export function enableScrolling() {
  document.body.style.overflow = null;
  document.body.style.webkitOverflowScrolling = null;
}
export function disableScrolling() {
  document.body.style.overflow = "hidden";
  document.body.style.webkitOverflowScrolling = "touch";
}
