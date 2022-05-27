// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".tooltip {\r\n      padding: 0 !important;\r\n      margin: 0 !important;\r\n      border: none !important;\r\n      display: none !important;\r\n}\r\n\r\n.tooltip.show {\r\n      display: inline-block !important;\r\n      opacity: 1 !important;\r\n      padding: 0 !important;\r\n      margin-left: 0 !important;\r\n      border: none !important;\r\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}