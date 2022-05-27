import React, {Component} from "../../snowpack/pkg/react.js";
import style from "./home.module.css.proxy.js";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.skills = `HTML, CSS, ES5/ES6, JavaScript, TypeScript, REST, JSON, YML, GSAP, Data Science, Wordpress, PHP, Python, Node JS, Turtle, C, C#, CPP, Discord.js, Git, _lodash, Wever, Xeon JS, Babel, AST, Bootstrap, SASS, LESS, ReactJS, ReactJS, ReactJS, Angular, Angular, jQuery, SQl, Gulp, npm, BEM, yern, Webpack, Percel, Vite, WebRTC, GitHub, GitLab, MongoDB, Linux, MERN, MEAN`;
  }
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: style.container,
      id: "home"
    }, /* @__PURE__ */ React.createElement("div", {
      className: style.content
    }, /* @__PURE__ */ React.createElement("h2", null, "Hi! I'm-"), /* @__PURE__ */ React.createElement("h1", null, "Arif Sardar ", /* @__PURE__ */ React.createElement("span", null, "(CodeWithArif),")), /* @__PURE__ */ React.createElement("h2", null, "A Software Developer for the Web."), /* @__PURE__ */ React.createElement("p", null, "I'm a Software Enginere (more specifically a Web Developer). I used to build expencive user interfaces with extreme user experiences. Beside that, I also teach people(mainly beginners) to code from scratch through online platforms.")));
  }
}
