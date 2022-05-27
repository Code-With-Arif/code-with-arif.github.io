
export let code = "._container_10p44_1 {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  min-height: fit-content;\n}\n._container_10p44_1 ._content_10p44_7 {\n  width: 100%;\n  height: auto;\n  min-height: 100%;\n  margin: auto;\n  position: absolute;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n@media screen and (max-width: 900px) {\n  ._container_10p44_1 ._content_10p44_7 {\n    display: block;\n  }\n}\n._container_10p44_1 ._content_10p44_7 ._left_10p44_22 {\n  width: 40%;\n  padding-left: 2rem;\n  padding-top: 4rem;\n}\n@media screen and (max-width: 900px) {\n  ._container_10p44_1 ._content_10p44_7 ._left_10p44_22 {\n    width: 100%;\n  }\n}\n._container_10p44_1 ._content_10p44_7 ._left_10p44_22 h1 {\n  color: rgb(63, 255, 159);\n  font-size: clamp(25px, 4vw, 45px);\n  font-weight: 400;\n  font-family: \"Acme\", sans-serif;\n}\n._container_10p44_1 ._content_10p44_7 ._left_10p44_22 p {\n  font-size: clamp(15px, 2vw, 20px);\n  font-family: \"Patrick Hand\", cursive;\n  max-width: 500px;\n}\n._container_10p44_1 ._content_10p44_7 ._right_10p44_43 {\n  width: 60%;\n  overflow: hidden;\n  flex: 1 1 auto;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 0;\n}\n@media screen and (max-width: 900px) {\n  ._container_10p44_1 ._content_10p44_7 ._right_10p44_43 {\n    position: static;\n    width: 100%;\n  }\n}\n._container_10p44_1 ._content_10p44_7 ._right_10p44_43 ._canvasContainer_10p44_58 {\n  position: relative;\n  height: 100%;\n  width: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  overflow: hidden;\n}\n._container_10p44_1 ._content_10p44_7 ._right_10p44_43 ._canvasContainer_10p44_58 ._canvas_10p44_58 {\n  margin: auto;\n  width: 100%;\n  min-width: 600px;\n}";
let json = {"container":"_container_10p44_1","content":"_content_10p44_7","left":"_left_10p44_22","right":"_right_10p44_43","canvasContainer":"_canvasContainer_10p44_58","canvas":"_canvas_10p44_58"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}