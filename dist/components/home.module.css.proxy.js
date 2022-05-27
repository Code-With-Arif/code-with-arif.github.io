
export let code = "._container_b35yo_1 {\n  width: 100%;\n  display: grid;\n  place-items: center;\n  position: relative;\n  padding: 7rem 0;\n}\n._container_b35yo_1 ._bg_b35yo_8 {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: -1;\n  overflow: hidden;\n  opacity: 0.7;\n}\n._container_b35yo_1 ._bg_b35yo_8 span {\n  color: aqua;\n  position: absolute;\n  top: var(--randTop);\n  left: var(--randLeft);\n}\n._container_b35yo_1 ._content_b35yo_24 {\n  width: 100%;\n  height: auto;\n  margin: auto;\n  padding: 0 20px;\n}\n._container_b35yo_1 ._content_b35yo_24 h2 {\n  color: rgb(63, 255, 159);\n  font-size: clamp(25px, 4vw, 45px);\n  font-weight: 400;\n  font-family: \"Acme\", sans-serif;\n}\n._container_b35yo_1 ._content_b35yo_24 h1 {\n  font-size: clamp(40px, 8vw, 90px);\n  font-family: \"Signika\", sans-serif;\n}\n._container_b35yo_1 ._content_b35yo_24 h1 span {\n  font-size: clamp(25px, 4vw, 45px);\n  font-weight: 400;\n  color: rgba(210, 210, 210, 0.6509803922);\n}\n._container_b35yo_1 ._content_b35yo_24 p {\n  font-size: clamp(15px, 2vw, 22px);\n  font-family: \"Patrick Hand\", cursive;\n  max-width: 500px;\n}\n._container_b35yo_1 ._canvas_b35yo_50 {\n  position: absolute;\n  min-height: 100%;\n  min-width: 100%;\n  height: auto;\n  width: auto;\n  aspect-ratio: 1;\n}";
let json = {"container":"_container_b35yo_1","bg":"_bg_b35yo_8","content":"_content_b35yo_24","canvas":"_canvas_b35yo_50"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}