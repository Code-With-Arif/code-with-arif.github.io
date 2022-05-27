import React, {Component} from "../../snowpack/pkg/react.js";
import style from "./contacts.module.css.proxy.js";
import emailjs from "../../snowpack/pkg/@emailjs/browser.js";
export default class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from_name: window.localStorage.getItem("from_name") || void 0,
      reply_to: window.localStorage.getItem("reply_to") || void 0,
      subject: "",
      message: ""
    };
    this.sendEmail = (e) => {
      try {
        e.preventDefault();
        console.log(e.target);
        this.setState({
          subject: "",
          message: ""
        });
        emailjs.sendForm("service_32iw64i", "template_wh0y83n", e.currentTarget, "PKhgwjY1E1NBKwsgg").then((res) => {
          console.log(res);
        });
      } catch (err) {
        console.error(err);
      }
    };
    this.sendEmail = this.sendEmail.bind(this);
  }
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: style.container,
      id: "contacts"
    }, /* @__PURE__ */ React.createElement("div", {
      className: style.content
    }, /* @__PURE__ */ React.createElement("div", {
      className: style.left
    }, /* @__PURE__ */ React.createElement("h1", null, "Contact Me"), /* @__PURE__ */ React.createElement("p", null, "If you have any questions, feel free to contact me."), /* @__PURE__ */ React.createElement("p", null, "Send me an email at ", /* @__PURE__ */ React.createElement("a", {
      href: "mailto:arifsardar.private@gmail.com?subject=Just%20wanna%20contact%20you!!!&body=Hello%20Arif!%20I%20am%20___.",
      rel: "noopener noreferrer"
    }, "arifsardar.private@gmail.com")), /* @__PURE__ */ React.createElement("form", {
      onSubmit: this.sendEmail
    }, /* @__PURE__ */ React.createElement("input", {
      type: "hidden",
      name: "contact_number"
    }), /* @__PURE__ */ React.createElement("div", {
      className: style.input + " " + style.half
    }, /* @__PURE__ */ React.createElement("input", {
      type: "text",
      placeholder: "",
      name: "from_name",
      required: true,
      value: this.state.from_name,
      onChange: (e) => {
        window.localStorage.setItem("from_name", e.target.value);
        this.setState({
          from_name: e.target.value
        });
      },
      className: this.state.from_name ? style.hasContent : ""
    }), /* @__PURE__ */ React.createElement("label", null, "Name"), /* @__PURE__ */ React.createElement("span", null)), /* @__PURE__ */ React.createElement("div", {
      className: style.input + " " + style.half
    }, /* @__PURE__ */ React.createElement("input", {
      type: "email",
      placeholder: "",
      name: "reply_to",
      required: true,
      value: this.state.reply_to,
      onChange: (e) => {
        window.localStorage.setItem("reply_to", e.target.value);
        this.setState({
          reply_to: e.target.value
        });
      },
      className: this.state.reply_to ? style.hasContent : ""
    }), /* @__PURE__ */ React.createElement("label", null, "Email"), /* @__PURE__ */ React.createElement("span", null)), /* @__PURE__ */ React.createElement("div", {
      className: style.input
    }, /* @__PURE__ */ React.createElement("textarea", {
      placeholder: "",
      name: "message",
      required: true,
      value: this.state.message,
      onChange: (e) => {
        this.setState({
          message: e.target.value
        });
      },
      className: this.state.message ? style.hasContent : ""
    }), /* @__PURE__ */ React.createElement("label", null, "Message"), /* @__PURE__ */ React.createElement("span", null)), /* @__PURE__ */ React.createElement("div", {
      className: style.submit
    }, /* @__PURE__ */ React.createElement("input", {
      type: "submit",
      placeholder: ""
    }), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("i", null))))), /* @__PURE__ */ React.createElement("div", {
      className: style.right
    }, /* @__PURE__ */ React.createElement("div", {
      className: style.mapContainer
    }, /* @__PURE__ */ React.createElement("iframe", {
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25636.644758613227!2d88.41934129953687!3d22.35997414776615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a026c53d317cb5d%3A0x383be3db380eb9ba!2sBaruipur%2C%20West%20Bengal%20700144!5e1!3m2!1sen!2sin!4v1653580236728!5m2!1sen!2sin",
      style: {border: 0},
      allowFullScreen: true,
      loading: "lazy",
      referrerPolicy: "no-referrer-when-downgrade"
    })))));
  }
}
