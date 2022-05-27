var _path, _path2;

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "../../../snowpack/pkg/react.js";

function SvgArrowBack(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    height: 24,
    width: 24,
    fill: "#FFF"
  }, props), _path || (_path = /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none",
    opacity: 0.87
  })), _path2 || (_path2 = /*#__PURE__*/React.createElement("path", {
    d: "M16.62 2.99a1.25 1.25 0 00-1.77 0L6.54 11.3a.996.996 0 000 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76z"
  })));
}

export default SvgArrowBack;