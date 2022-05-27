import React from "../../snowpack/pkg/react.js";
import script from "../../snowpack/pkg/scriptjs.js";
var twitterWidgetJs = "https://platform.twitter.com/widgets.js";
var methodName = "createTimeline";
var TwitterTimelineEmbed = function TwitterTimelineEmbed2(props) {
  var ref = React.useRef(null);
  var _React$useState = React.useState(true), loading = _React$useState[0], setLoading = _React$useState[1];
  var buildOptions = function buildOptions2() {
    var options = Object.assign({}, props.options);
    if (props !== null && props !== void 0 && props.autoHeight) {
      var _ref$current, _ref$current$parentNo;
      options.height = (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : (_ref$current$parentNo = _ref$current["parentNode"]) === null || _ref$current$parentNo === void 0 ? void 0 : _ref$current$parentNo["offsetHeight"];
    }
    options = Object.assign({}, options, {
      theme: props === null || props === void 0 ? void 0 : props.theme,
      linkColor: props === null || props === void 0 ? void 0 : props.linkColor,
      borderColor: props === null || props === void 0 ? void 0 : props.borderColor,
      lang: props === null || props === void 0 ? void 0 : props.lang,
      tweetLimit: props === null || props === void 0 ? void 0 : props.tweetLimit,
      ariaPolite: props === null || props === void 0 ? void 0 : props.ariaPolite
    });
    return options;
  };
  var buildChromeOptions = function buildChromeOptions2(options) {
    options.chrome = "";
    if (props.noHeader) {
      options.chrome = options.chrome + " noheader";
    }
    if (props.noFooter) {
      options.chrome = options.chrome + " nofooter";
    }
    if (props.noBorders) {
      options.chrome = options.chrome + " noborders";
    }
    if (props.noScrollbar) {
      options.chrome = options.chrome + " noscrollbar";
    }
    if (props.transparent) {
      options.chrome = options.chrome + " transparent";
    }
    return options;
  };
  React.useEffect(function() {
    var isComponentMounted = true;
    script(twitterWidgetJs, "twitter-embed", function() {
      if (!window.twttr) {
        console.error("Failure to load window.twttr, aborting load");
        return;
      }
      if (isComponentMounted) {
        if (!window.twttr.widgets[methodName]) {
          console.error("Method " + methodName + " is not present anymore in twttr.widget api");
          return;
        }
        var options = buildOptions();
        options = buildChromeOptions(options);
        window.twttr.widgets[methodName]({
          sourceType: props.sourceType,
          screenName: props.screenName,
          userId: props.userId,
          ownerScreenName: props.ownerScreenName,
          slug: props.slug,
          id: props.id || props.widgetId,
          url: props.url
        }, ref === null || ref === void 0 ? void 0 : ref.current, options).then(function(element) {
          setLoading(false);
          if (props.onLoad) {
            props.onLoad(element);
          }
        });
      }
    });
    return function() {
      isComponentMounted = false;
    };
  }, []);
  return React.createElement(React.Fragment, null, loading && React.createElement(React.Fragment, null, props.placeholder), React.createElement("div", {
    ref
  }));
};
export default TwitterTimelineEmbed;
