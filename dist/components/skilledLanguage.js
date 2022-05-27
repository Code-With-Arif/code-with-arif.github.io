import React, {Component} from "../../snowpack/pkg/react.js";
import loadScript from "../utils/scriptLoader.js";
export default class SkilledLanguage extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }
  componentDidMount() {
    if (this.canvasRef.current) {
      this.canvasRef.current.width = this.canvasRef.current.offsetWidth;
      this.canvasRef.current.height = this.canvasRef.current.offsetHeight;
      window.addEventListener("resize", (e) => {
        this.resizeFunction.bind(this)(e);
      });
      loadScript("/js/tagcanvas.js", () => {
        try {
          window.TagCanvas.Start("myCanvas", "", {
            outlineThickness: 0.5,
            outlineColour: "#FE0853",
            maxSpeed: 0.06,
            shuffleTags: true,
            zoom: 0.8,
            noSelect: true,
            textFont: "bolder 24px/1 Helvetica, Arial, sans-serif",
            fadeIn: 2500,
            initial: [0.3, -0.1],
            depth: 1.1,
            ...this.props.options
          });
        } catch (err) {
          console.log(err);
        }
      }, (err) => {
        console.log(err);
      });
    }
  }
  resizeFunction(e) {
    if (this.canvasRef.current) {
      this.canvasRef.current.width = this.canvasRef.current.offsetWidth;
      this.canvasRef.current.height = this.canvasRef.current.offsetHeight;
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", (e) => {
      this.resizeFunction.bind(this)(e);
    });
  }
  render() {
    return /* @__PURE__ */ React.createElement("canvas", {
      ref: this.canvasRef,
      id: "myCanvas",
      style: {
        aspectRatio: "1",
        ...this.props.style
      },
      className: this.props.className
    }, this.props.children);
  }
}
