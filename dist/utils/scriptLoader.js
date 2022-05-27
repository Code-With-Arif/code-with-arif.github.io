function loadScript(src, onLoad, onError) {
  const script = document.createElement("script");
  script.onload = onLoad;
  script.onerror = onError;
  script.src = src;
  document.head.appendChild(script);
}
export default loadScript;
