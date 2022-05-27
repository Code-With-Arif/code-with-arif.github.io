import React, {Component} from "../../snowpack/pkg/react.js";
import style from "./skills.module.css.proxy.js";
import SkilledLanguage from "./skilledLanguage.js";
export default class Skills extends Component {
  constructor(props) {
    super(props);
    this.skills = `HTML, CSS, ES5/ES6, JavaScript, TypeScript, REST, JSON, YML, GSAP, Data Science, Wordpress, PHP, Python, Node JS, Turtle, C, C#, CPP, Discord.js, Git, _lodash, Wever, Xeon JS, Babel, AST, Bootstrap, SASS, LESS, ReactJS, ReactJS, ReactJS, Angular, Angular, jQuery, SQl, Gulp, npm, BEM, yern, Webpack, Percel, Vite, WebRTC, GitHub, GitLab, MongoDB, Linux, MERN, MEAN, AI, ML, Algorithem`;
  }
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: style.container,
      id: "skills"
    }, /* @__PURE__ */ React.createElement("div", {
      className: style.content
    }, /* @__PURE__ */ React.createElement("div", {
      className: style.left
    }, /* @__PURE__ */ React.createElement("h1", null, "My Skills & Experience"), /* @__PURE__ */ React.createElement("p", null, "Since I have started my software developement journey, I have collected tons of skills & experience through out my way. I'm specially experienced in React JS, indeed in MERN Stack. Quite a lot of projects, I have already built with MERN Stack & other stuffs."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("p", null, "Currently I'm building a brand new web technology called WEAVER JS. It's almost like React, but much faster, effecient & easy to create awesome web frontends along with backend apis.")), /* @__PURE__ */ React.createElement("div", {
      className: style.right
    }, /* @__PURE__ */ React.createElement("div", {
      className: style.canvasContainer
    }, /* @__PURE__ */ React.createElement(SkilledLanguage, {
      className: style.canvas,
      options: {
        maxSpeed: 0.02,
        zoom: 0.8
      }
    }, /* @__PURE__ */ React.createElement("ul", null, this.skills.split(",").map((skill, index) => /* @__PURE__ */ React.createElement("li", {
      key: index
    }, /* @__PURE__ */ React.createElement("a", {
      href: "#"
    }, skill.trim())))))))));
  }
}
