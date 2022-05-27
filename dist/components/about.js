import React, {Component} from "../../snowpack/pkg/react.js";
import style from "./about.module.css.proxy.js";
export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activate: this.props.activate,
      data: [
        {name: "React JS", value: 80},
        {name: "Javascript", value: 60},
        {name: "NodeJS", value: 60},
        {name: "Python", value: 40},
        {name: "MERN Stack", value: 75},
        {name: "Angular", value: 10}
      ]
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.activate === true && prevProps.activate === false) {
      this.setState({
        activate: this.props.activate
      });
    }
  }
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: style.container,
      id: "about"
    }, /* @__PURE__ */ React.createElement("div", {
      className: style.content
    }, /* @__PURE__ */ React.createElement("div", {
      className: style.left
    }, /* @__PURE__ */ React.createElement("h1", null, "About Me"), /* @__PURE__ */ React.createElement("p", null, "Hi!! I am Arif Sardar. I am basically a science student, much passionate about programming and learning new things. I like to learn the languages to make my conversation with the computers. I started programming since from my primary school days, to still now in my higher studies."), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("p", null, "Basically, I'm a self-taught programmer. I am on my way to get my college degree. But, still now, I'm well experienced in React, Redux & also advance Javascript. I also used to teach people through online platforms like Google-meet & Zoom. I'm also a content creater and a gamer. I used to be active on twitter, making guys eligible about coding.")), /* @__PURE__ */ React.createElement("div", {
      className: style.right
    }, /* @__PURE__ */ React.createElement("div", {
      className: style.chartContainer
    }, /* @__PURE__ */ React.createElement("div", {
      className: style.chart
    }, this.state.data.map((item, index) => /* @__PURE__ */ React.createElement("div", {
      className: style.bar,
      key: index
    }, /* @__PURE__ */ React.createElement("p", null, item.name, " (", item.value, "%)"), /* @__PURE__ */ React.createElement("div", {
      className: style.progress
    }, /* @__PURE__ */ React.createElement("span", {
      style: {
        "--width": item.value + "%",
        backgroundColor: `hsla(${index * 30}, 100%, 50%, 1)`
      },
      className: this.state.activate ? style.show : ""
    })))))))));
  }
}
