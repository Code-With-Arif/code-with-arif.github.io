
export let code = "._container_ss3ca_1 {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  background-color: #000;\n  border-radius: 30px;\n  overflow: hidden;\n  padding: 15px;\n}\n._container_ss3ca_1 ._topBar_ss3ca_10 {\n  position: absolute;\n  top: 0;\n  left: 50%;\n  z-index: 2;\n  transform: translateX(-50%);\n  width: 50%;\n  height: 5%;\n  background-color: #000;\n  border-radius: 0 0 10px 10px;\n}\n._container_ss3ca_1 ._punchCamera_ss3ca_21 {\n  position: absolute;\n  top: 20px;\n  left: 50%;\n  z-index: 2;\n  transform: translateX(-50%);\n  width: 15px;\n  aspect-ratio: 1;\n  background-color: #000;\n  border-radius: 50%;\n}\n._container_ss3ca_1 ._punchCamera_ss3ca_21:before {\n  content: \"\";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 50%;\n  height: 50%;\n  transform: translate(-50%, -50%);\n  border-radius: 50%;\n  background-color: #1d1d1d;\n}\n._container_ss3ca_1 ._main_ss3ca_43 {\n  background-color: #fff;\n  width: 100%;\n  height: 100%;\n  border-radius: 20px;\n  overflow: hidden;\n}\n._container_ss3ca_1 ._main_ss3ca_43 video {\n  width: 100%;\n  height: 100%;\n  cursor: auto;\n}\n._container_ss3ca_1 ._main_ss3ca_43 img {\n  width: 100%;\n  height: 100%;\n}\n._container_ss3ca_1 ._physicalButtons_ss3ca_59 {\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  z-index: 2;\n  width: 100%;\n  height: 7%;\n  background-color: #000;\n  display: flex;\n  justify-content: space-evenly;\n}\n._container_ss3ca_1 ._physicalButtons_ss3ca_59 ._button_ss3ca_70 {\n  text-align: center;\n}";
let json = {"container":"_container_ss3ca_1","topBar":"_topBar_ss3ca_10","punchCamera":"_punchCamera_ss3ca_21","main":"_main_ss3ca_43","physicalButtons":"_physicalButtons_ss3ca_59","button":"_button_ss3ca_70"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}