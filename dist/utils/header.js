import React, {Component} from "../../snowpack/pkg/react.js";
import style from "./header.module.css.proxy.js";
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hamburger: false
    };
  }
  render() {
    return /* @__PURE__ */ React.createElement("header", {
      className: `${style.headerContainer} ${this.props.hidden && !this.state.hamburger && style.hidden}`,
      style: {top: this.props.top}
    }, /* @__PURE__ */ React.createElement("div", {
      className: style.left
    }), /* @__PURE__ */ React.createElement("div", {
      className: style.right
    }, /* @__PURE__ */ React.createElement("div", {
      className: style.hamburger,
      onClick: (e) => {
        this.setState({hamburger: !this.state.hamburger});
      }
    }, /* @__PURE__ */ React.createElement("div", {
      className: `${style.topicon} ${this.state.hamburger && style.active}`
    }), /* @__PURE__ */ React.createElement("div", {
      className: `${style.icon} ${this.state.hamburger && style.active}`
    }), /* @__PURE__ */ React.createElement("div", {
      className: `${style.bottomicon} ${this.state.hamburger && style.active}`
    })), /* @__PURE__ */ React.createElement("ul", {
      className: this.state.hamburger ? style.hamburgerOn : ""
    }, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "#home"
    }, "HOME")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "#about"
    }, "ABOUT")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "#skills"
    }, "SKILLS")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "#contacts"
    }, "CONTACTS")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
      href: "#resume"
    }, "RESUME")))));
  }
}
