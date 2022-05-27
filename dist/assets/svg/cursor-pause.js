var _g;

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "../../../snowpack/pkg/react.js";

function SvgCursorPause(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    fill: "none",
    height: 24,
    width: 24,
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _g || (_g = /*#__PURE__*/React.createElement("g", {
    fill: "#000"
  }, /*#__PURE__*/React.createElement("path", {
    clipRule: "evenodd",
    d: "M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z",
    fillRule: "evenodd"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 8a1 1 0 012 0v8a1 1 0 11-2 0zM13 8a1 1 0 112 0v8a1 1 0 11-2 0z"
  }))));
}

export default SvgCursorPause;