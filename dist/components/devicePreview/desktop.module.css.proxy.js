
export let code = "._container_jzjod_1 {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  background-color: #000;\n  border-radius: 30px;\n  overflow: hidden;\n  padding: 15px;\n}\n._container_jzjod_1 ._main_jzjod_10 {\n  background-color: #fff;\n  width: 100%;\n  height: 100%;\n  border-radius: 20px;\n  overflow: hidden;\n}\n._container_jzjod_1 ._main_jzjod_10 video {\n  width: 100%;\n  height: 100%;\n  cursor: auto;\n}\n._container_jzjod_1 ._main_jzjod_10 img {\n  width: 100%;\n  height: 100%;\n}\n._container_jzjod_1 ._bottom_jzjod_26 {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  background-color: #000;\n  border-radius: 20px;\n  overflow: hidden;\n  padding: 15px;\n}";
let json = {"container":"_container_jzjod_1","main":"_main_jzjod_10","bottom":"_bottom_jzjod_26"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}