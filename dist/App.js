import React, {useEffect, useState} from "../snowpack/pkg/react.js";
import {ParallaxProvider} from "../snowpack/pkg/react-scroll-parallax.js";
import style from "./App.module.css.proxy.js";
import "./App.css.proxy.js";
import loadScript from "./utils/scriptLoader.js";
import Header from "./utils/header.js";
import Home from "./components/home.js";
import About from "./components/about.js";
import Skills from "./components/skills.js";
import Contacts from "./components/contacts.js";
function isMobile() {
  var isMobile2 = false;
  if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
    isMobile2 = true;
  }
  return isMobile2;
}
function App(props) {
  const skills = `HTML, CSS, ES5/ES6, JavaScript, TypeScript, REST, JSON, YML, GSAP, Data Science, Wordpress, PHP, Python, Node JS, Turtle, C, C#, CPP, Discord.js, Git, _lodash, Wever, Xeon JS, Babel, AST, Bootstrap, SASS, LESS, ReactJS, ReactJS, ReactJS, Angular, Angular, jQuery, SQl, Gulp, npm, BEM, yern, Webpack, Percel, Vite, WebRTC, GitHub, GitLab, MongoDB, Linux, MERN, MEAN`;
  const [headerTop, setHeaderTop] = useState(0);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [aboutActivated, setAboutActivated] = useState(false);
  const ismobile = isMobile();
  const contentRef = React.createRef();
  const containerRef = React.createRef();
  useEffect(() => {
    if (!ismobile) {
      loadScript("/js/osciliator.js", () => {
        window.initOciliator(false);
      }, (err) => {
        console.log(err);
      });
    }
    function hashControls() {
      if (!window.location.hash)
        return;
      const targetElement = document.querySelector(window.location.hash);
      if (!targetElement)
        return;
      if (!contentRef.current)
        return;
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }
    hashControls();
    window.addEventListener("hashchange", hashControls);
    return () => {
      window.removeEventListener("hashchange", hashControls);
    };
  }, []);
  return /* @__PURE__ */ React.createElement(ParallaxProvider, {
    scrollContainer: containerRef.current || void 0
  }, /* @__PURE__ */ React.createElement("canvas", {
    id: "osciliatorCanvas",
    style: {
      cursor: "none",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: -1,
      opacity: 0.7
    }
  }), /* @__PURE__ */ React.createElement("div", {
    className: style.container,
    ref: containerRef,
    onScroll: (e) => {
      setHeaderHidden(e.currentTarget.scrollTop > headerTop);
      setHeaderTop(e.currentTarget.scrollTop);
      const about = document.querySelector("#about");
      if (about) {
        setAboutActivated(e.currentTarget.scrollTop > about.getBoundingClientRect().bottom);
      }
    }
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.lSideBar,
    style: {top: headerTop}
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.links
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.topBorder
  }), /* @__PURE__ */ React.createElement("a", {
    href: "https://www.facebook.com/arif.sardar.397501/",
    target: "_blank",
    "data-tip": true,
    "data-for": "facebook"
  }, /* @__PURE__ */ React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    version: "1.0",
    x: "0px",
    y: "0px",
    viewBox: "0 0 50 50",
    fill: "currentColor",
    className: style.facebookIcon
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M40,0H10C4.486,0,0,4.486,0,10v30c0,5.514,4.486,10,10,10h30c5.514,0,10-4.486,10-10V10C50,4.486,45.514,0,40,0z M39,17h-3 c-2.145,0-3,0.504-3,2v3h6l-1,6h-5v20h-7V28h-3v-6h3v-3c0-4.677,1.581-8,7-8c2.902,0,6,1,6,1V17z"
  }))), /* @__PURE__ */ React.createElement("a", {
    href: "https://www.youtube.com/channel/UCZKq8Y8av3bIrns0t-w3lLg",
    target: "_blank",
    "data-tip": true,
    "data-for": "youtube"
  }, /* @__PURE__ */ React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    x: "0px",
    y: "0px",
    viewBox: "0 0 50 50",
    fill: "currentColor",
    className: style.facebookIcon
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z"
  }))), /* @__PURE__ */ React.createElement("a", {
    href: "https://github.com/Code-With-Arif",
    target: "_blank",
    "data-tip": true,
    "data-for": "github"
  }, /* @__PURE__ */ React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    role: "img",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /* @__PURE__ */ React.createElement("title", null, "GitHub"), /* @__PURE__ */ React.createElement("path", {
    d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
  }))), /* @__PURE__ */ React.createElement("a", {
    href: "https://twitter.com/Code_With_Arif",
    target: "_blank",
    "data-tip": true,
    "data-for": "twitter"
  }, /* @__PURE__ */ React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    role: "img",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /* @__PURE__ */ React.createElement("title", null, "Twitter"), /* @__PURE__ */ React.createElement("path", {
    d: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
  }))), /* @__PURE__ */ React.createElement("div", {
    className: style.bottomBorder
  }))), /* @__PURE__ */ React.createElement("div", {
    className: style.content,
    ref: contentRef
  }, /* @__PURE__ */ React.createElement(Header, {
    top: ismobile ? 0 : headerTop,
    hidden: ismobile ? false : headerHidden
  }), /* @__PURE__ */ React.createElement(Home, null), /* @__PURE__ */ React.createElement(About, {
    activate: aboutActivated
  }), /* @__PURE__ */ React.createElement(Skills, null), /* @__PURE__ */ React.createElement(Contacts, null), /* @__PURE__ */ React.createElement("footer", null, /* @__PURE__ */ React.createElement("div", {
    className: style.links
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.topBorder
  }), /* @__PURE__ */ React.createElement("a", {
    href: "https://www.facebook.com/arif.sardar.397501/",
    target: "_blank",
    "data-tip": true,
    "data-for": "facebook"
  }, /* @__PURE__ */ React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    version: "1.0",
    x: "0px",
    y: "0px",
    viewBox: "0 0 50 50",
    fill: "currentColor",
    className: style.facebookIcon
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M40,0H10C4.486,0,0,4.486,0,10v30c0,5.514,4.486,10,10,10h30c5.514,0,10-4.486,10-10V10C50,4.486,45.514,0,40,0z M39,17h-3 c-2.145,0-3,0.504-3,2v3h6l-1,6h-5v20h-7V28h-3v-6h3v-3c0-4.677,1.581-8,7-8c2.902,0,6,1,6,1V17z"
  }))), /* @__PURE__ */ React.createElement("a", {
    href: "https://www.youtube.com/channel/UCZKq8Y8av3bIrns0t-w3lLg",
    target: "_blank",
    "data-tip": true,
    "data-for": "youtube"
  }, /* @__PURE__ */ React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    x: "0px",
    y: "0px",
    viewBox: "0 0 50 50",
    fill: "currentColor",
    className: style.facebookIcon
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z"
  }))), /* @__PURE__ */ React.createElement("a", {
    href: "https://github.com/Code-With-Arif",
    target: "_blank",
    "data-tip": true,
    "data-for": "github"
  }, /* @__PURE__ */ React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    role: "img",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /* @__PURE__ */ React.createElement("title", null, "GitHub"), /* @__PURE__ */ React.createElement("path", {
    d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
  }))), /* @__PURE__ */ React.createElement("a", {
    href: "https://twitter.com/Code_With_Arif",
    target: "_blank",
    "data-tip": true,
    "data-for": "twitter2"
  }, /* @__PURE__ */ React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    role: "img",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /* @__PURE__ */ React.createElement("title", null, "Twitter"), /* @__PURE__ */ React.createElement("path", {
    d: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
  }))), /* @__PURE__ */ React.createElement("div", {
    className: style.bottomBorder
  })), /* @__PURE__ */ React.createElement("p", null, window.location.origin, " - No Copyright © All Rights Resurved"), /* @__PURE__ */ React.createElement("p", null, "Designed By Arif Sardar - ", new Date().getFullYear())))));
}
export default App;
