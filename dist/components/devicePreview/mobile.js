import React, {Component} from "../../../snowpack/pkg/react.js";
import style from "./mobile.module.css";
import PausedSvg from "../../assets/svg/cursor-pause.js";
import PlaySvg from "../../assets/svg/cursor-play.js";
import ArrowBackSvg from "../../assets/svg/arrow_back.js";
import BoxSvg from "../../assets/svg/box.js";
import ClearAllSvg from "../../assets/svg/clear_all.js";
export default class Mobile extends Component {
  constructor(props) {
    super(props);
    this.type = "image";
    this.videoRef = React.createRef();
    this.cursorRef = React.createRef();
    this.state = {
      videoPaused: true,
      isCursorIn: false
    };
    if (typeof props.video?.src === "string" && props.video?.src.length > 0) {
      this.type = "video";
    }
    this.state = {
      videoPaused: true,
      isCursorIn: false
    };
  }
  componentDidMount() {
    if (this.type === "video") {
      if (this.videoRef.current) {
        this.videoRef.current.play();
        this.videoRef.current.style.cursor = "none";
        this.setState({videoPaused: this.videoRef.current.paused});
        this.videoRef.current.addEventListener("click", (e) => {
          if (this.videoRef.current) {
            this.videoRef.current.paused ? this.videoRef.current.play() : this.videoRef.current.pause();
            this.setState({videoPaused: this.videoRef.current.paused});
          }
        });
        this.videoRef.current.addEventListener("mousemove", (e) => {
          this.setState({isCursorIn: true});
          this.videoRef.current?.addEventListener("mouseleave", (e2) => {
            this.setState({isCursorIn: false});
          });
          if (this.cursorRef.current) {
            this.cursorRef.current.style.left = `${e.offsetX}px`;
            this.cursorRef.current.style.top = `${e.offsetY}px`;
          }
        });
      }
    }
  }
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: style.container,
      style: this.props.style
    }, this.props.fx?.punchCamera ? /* @__PURE__ */ React.createElement("div", {
      className: style.punchCamera
    }) : /* @__PURE__ */ React.createElement("div", {
      className: style.topBar
    }), /* @__PURE__ */ React.createElement("div", {
      className: style.main,
      style: {
        height: this.props.fx?.physicalButtons ? "93%" : "100%"
      }
    }, typeof this.props.video?.src === "string" && this.props.video?.src.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", {
      ref: this.cursorRef,
      style: {
        pointerEvents: "none",
        position: "absolute"
      }
    }, this.state.isCursorIn && (this.state.videoPaused ? /* @__PURE__ */ React.createElement(PlaySvg, {
      className: style.play
    }) : /* @__PURE__ */ React.createElement(PausedSvg, {
      className: style.pause
    }))), /* @__PURE__ */ React.createElement("video", {
      src: this.props.video.src,
      ref: this.videoRef,
      loop: this.props.video.loop,
      muted: this.props.video.muted
    })), typeof this.props.image?.src === "string" && this.props.image?.src.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("img", {
      src: this.props.image.src,
      alt: this.props.image.alt
    }))), this.props.fx?.physicalButtons && /* @__PURE__ */ React.createElement("div", {
      className: style.physicalButtons
    }, /* @__PURE__ */ React.createElement("div", {
      className: style.button
    }, /* @__PURE__ */ React.createElement(ClearAllSvg, null)), /* @__PURE__ */ React.createElement("div", {
      className: style.button
    }, /* @__PURE__ */ React.createElement(BoxSvg, null)), /* @__PURE__ */ React.createElement("div", {
      className: style.button
    }, /* @__PURE__ */ React.createElement(ArrowBackSvg, null))));
  }
}
