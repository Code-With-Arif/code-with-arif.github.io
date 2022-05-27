import { r as react } from './common/index-59cd3494.js';
import './common/_commonjsHelpers-668e6127.js';

/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */

// These values are established by empiricism with tests (tradeoff: performance VS precision)
var NEWTON_ITERATIONS = 4;
var NEWTON_MIN_SLOPE = 0.001;
var SUBDIVISION_PRECISION = 0.0000001;
var SUBDIVISION_MAX_ITERATIONS = 10;

var kSplineTableSize = 11;
var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

var float32ArraySupported = typeof Float32Array === 'function';

function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
function C (aA1)      { return 3.0 * aA1; }

// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
function calcBezier (aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT; }

// Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
function getSlope (aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1); }

function binarySubdivide (aX, aA, aB, mX1, mX2) {
  var currentX, currentT, i = 0;
  do {
    currentT = aA + (aB - aA) / 2.0;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0.0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
  return currentT;
}

function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {
 for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
   var currentSlope = getSlope(aGuessT, mX1, mX2);
   if (currentSlope === 0.0) {
     return aGuessT;
   }
   var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
   aGuessT -= currentX / currentSlope;
 }
 return aGuessT;
}

function LinearEasing (x) {
  return x;
}

var src = function bezier (mX1, mY1, mX2, mY2) {
  if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
    throw new Error('bezier x values must be in [0, 1] range');
  }

  if (mX1 === mY1 && mX2 === mY2) {
    return LinearEasing;
  }

  // Precompute samples table
  var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
  for (var i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
  }

  function getTForX (aX) {
    var intervalStart = 0.0;
    var currentSample = 1;
    var lastSample = kSplineTableSize - 1;

    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;

    // Interpolate to provide an initial guess for t
    var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    var guessForT = intervalStart + dist * kSampleStepSize;

    var initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0.0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }

  return function BezierEasing (x) {
    // Because JavaScript number are imprecise, we should guarantee the extremes are right.
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    return calcBezier(getTForX(x), mY1, mY2);
  };
};

var Limits = function Limits(properties) {
  this.startX = properties.startX;
  this.startY = properties.startY;
  this.endX = properties.endX;
  this.endY = properties.endY; // Used to calculate the progress of the element

  this.totalX = this.endX - this.startX;
  this.totalY = this.endY - this.startY; // Used to scale translate effects

  this.startMultiplierX = properties.startMultiplierX || 1;
  this.endMultiplierX = properties.endMultiplierX || 1;
  this.startMultiplierY = properties.startMultiplierY || 1;
  this.endMultiplierY = properties.endMultiplierY || 1;
};

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var ValidCSSEffects;

(function (ValidCSSEffects) {
  ValidCSSEffects["speed"] = "speed";
  ValidCSSEffects["translateX"] = "translateX";
  ValidCSSEffects["translateY"] = "translateY";
  ValidCSSEffects["rotate"] = "rotate";
  ValidCSSEffects["rotateX"] = "rotateX";
  ValidCSSEffects["rotateY"] = "rotateY";
  ValidCSSEffects["rotateZ"] = "rotateZ";
  ValidCSSEffects["scale"] = "scale";
  ValidCSSEffects["scaleX"] = "scaleX";
  ValidCSSEffects["scaleY"] = "scaleY";
  ValidCSSEffects["scaleZ"] = "scaleZ";
  ValidCSSEffects["opacity"] = "opacity";
})(ValidCSSEffects || (ValidCSSEffects = {}));

var Units;

(function (Units) {
  Units["px"] = "px";
  Units["%"] = "%";
  Units["vh"] = "vh";
  Units["vw"] = "vw";
})(Units || (Units = {}));

var RotationUnits;

(function (RotationUnits) {
  RotationUnits["deg"] = "deg";
  RotationUnits["turn"] = "turn";
  RotationUnits["rad"] = "rad";
})(RotationUnits || (RotationUnits = {}));

var ScaleUnits;

(function (ScaleUnits) {
  ScaleUnits[""] = "";
})(ScaleUnits || (ScaleUnits = {}));

var ScrollAxis;

(function (ScrollAxis) {
  ScrollAxis["vertical"] = "vertical";
  ScrollAxis["horizontal"] = "horizontal";
})(ScrollAxis || (ScrollAxis = {}));

var EasingPreset;

(function (EasingPreset) {
  EasingPreset["ease"] = "ease";
  EasingPreset["easeIn"] = "easeIn";
  EasingPreset["easeOut"] = "easeOut";
  EasingPreset["easeInOut"] = "easeInOut";
  EasingPreset["easeInQuad"] = "easeInQuad";
  EasingPreset["easeInCubic"] = "easeInCubic";
  EasingPreset["easeInQuart"] = "easeInQuart";
  EasingPreset["easeInQuint"] = "easeInQuint";
  EasingPreset["easeInSine"] = "easeInSine";
  EasingPreset["easeInExpo"] = "easeInExpo";
  EasingPreset["easeInCirc"] = "easeInCirc";
  EasingPreset["easeOutQuad"] = "easeOutQuad";
  EasingPreset["easeOutCubic"] = "easeOutCubic";
  EasingPreset["easeOutQuart"] = "easeOutQuart";
  EasingPreset["easeOutQuint"] = "easeOutQuint";
  EasingPreset["easeOutSine"] = "easeOutSine";
  EasingPreset["easeOutExpo"] = "easeOutExpo";
  EasingPreset["easeOutCirc"] = "easeOutCirc";
  EasingPreset["easeInOutQuad"] = "easeInOutQuad";
  EasingPreset["easeInOutCubic"] = "easeInOutCubic";
  EasingPreset["easeInOutQuart"] = "easeInOutQuart";
  EasingPreset["easeInOutQuint"] = "easeInOutQuint";
  EasingPreset["easeInOutSine"] = "easeInOutSine";
  EasingPreset["easeInOutExpo"] = "easeInOutExpo";
  EasingPreset["easeInOutCirc"] = "easeInOutCirc";
  EasingPreset["easeInBack"] = "easeInBack";
  EasingPreset["easeOutBack"] = "easeOutBack";
  EasingPreset["easeInOutBack"] = "easeInOutBack";
})(EasingPreset || (EasingPreset = {}));

/**
 * Creates a unique id to distinguish parallax elements.
 */
var id = 0;
function createId() {
  ++id;
  return id;
}

var Rect = /*#__PURE__*/function () {
  function Rect(options) {
    var rect = options.el.getBoundingClientRect(); // rect is based on viewport -- must adjust for relative scroll container

    if (options.view.scrollContainer) {
      var scrollRect = options.view.scrollContainer.getBoundingClientRect();
      rect = _extends({}, rect, {
        top: rect.top - scrollRect.top,
        right: rect.right - scrollRect.left,
        bottom: rect.bottom - scrollRect.top,
        left: rect.left - scrollRect.left
      });
    }

    this.height = options.el.offsetHeight;
    this.width = options.el.offsetWidth;
    this.left = rect.left;
    this.right = rect.right;
    this.top = rect.top;
    this.bottom = rect.bottom;

    if (options.rootMargin) {
      this._setRectWithRootMargin(options.rootMargin);
    }
  }
  /**
   * Apply root margin to all properties
   */


  var _proto = Rect.prototype;

  _proto._setRectWithRootMargin = function _setRectWithRootMargin(rootMargin) {
    var totalRootY = rootMargin.top + rootMargin.bottom;
    var totalRootX = rootMargin.left + rootMargin.right;
    this.top -= rootMargin.top;
    this.right += rootMargin.right;
    this.bottom += rootMargin.bottom;
    this.left -= rootMargin.left;
    this.height += totalRootY;
    this.width += totalRootX;
  };

  return Rect;
}();

var VALID_UNITS = [ScaleUnits[''], Units.px, Units['%'], Units['vh'], Units['vw'], RotationUnits.deg, RotationUnits.turn, RotationUnits.rad];
/**
 * Determines the unit of a string and parses the value
 */

function parseValueAndUnit(str, defaultUnit) {
  if (defaultUnit === void 0) {
    defaultUnit = Units['%'];
  }

  var out = {
    value: 0,
    unit: defaultUnit
  };
  if (typeof str === 'undefined') return out;
  var isValid = typeof str === 'number' || typeof str === 'string';

  if (!isValid) {
    throw new Error('Invalid value provided. Must provide a value as a string or number');
  }

  str = String(str);
  out.value = parseFloat(str); // @ts-ignore

  out.unit = str.match(/[\d.\-+]*\s*(.*)/)[1] || defaultUnit; // @ts-expect-error

  var isValidUnit = VALID_UNITS.includes(out.unit);

  if (!isValidUnit) {
    throw new Error('Invalid unit provided.');
  }

  return out;
}

var easingPresets = {
  ease: [0.25, 0.1, 0.25, 1.0],
  easeIn: [0.42, 0.0, 1.0, 1.0],
  easeOut: [0.0, 0.0, 0.58, 1.0],
  easeInOut: [0.42, 0.0, 0.58, 1.0],

  /* Ease IN curves */
  easeInQuad: [0.55, 0.085, 0.68, 0.53],
  easeInCubic: [0.55, 0.055, 0.675, 0.19],
  easeInQuart: [0.895, 0.03, 0.685, 0.22],
  easeInQuint: [0.755, 0.05, 0.855, 0.06],
  easeInSine: [0.47, 0.0, 0.745, 0.715],
  easeInExpo: [0.95, 0.05, 0.795, 0.035],
  easeInCirc: [0.6, 0.04, 0.98, 0.335],

  /* Ease Out Curves */
  easeOutQuad: [0.25, 0.46, 0.45, 0.94],
  easeOutCubic: [0.215, 0.61, 0.355, 1.0],
  easeOutQuart: [0.165, 0.84, 0.44, 1.0],
  easeOutQuint: [0.23, 1.0, 0.32, 1.0],
  easeOutSine: [0.39, 0.575, 0.565, 1.0],
  easeOutExpo: [0.19, 1.0, 0.22, 1.0],
  easeOutCirc: [0.075, 0.82, 0.165, 1.0],

  /* Ease IN Out Curves */
  easeInOutQuad: [0.455, 0.03, 0.515, 0.955],
  easeInOutCubic: [0.645, 0.045, 0.355, 1.0],
  easeInOutQuart: [0.77, 0.0, 0.175, 1.0],
  easeInOutQuint: [0.86, 0.0, 0.07, 1.0],
  easeInOutSine: [0.445, 0.05, 0.55, 0.95],
  easeInOutExpo: [1.0, 0.0, 0.0, 1.0],
  easeInOutCirc: [0.785, 0.135, 0.15, 0.86],

  /* Ease Bounce Curves */
  easeInBack: [0.6, -0.28, 0.735, 0.045],
  easeOutBack: [0.175, 0.885, 0.32, 1.275],
  easeInOutBack: [0.68, -0.55, 0.265, 1.55]
};

function createEasingFunction(easing) {
  if (Array.isArray(easing)) {
    return src(easing[0], easing[1], easing[2], easing[3]);
  }

  if (typeof easing === 'string' && typeof easingPresets[easing] !== 'undefined') {
    var params = easingPresets[easing];
    return src(params[0], params[1], params[2], params[3]);
  }

  return;
}

var PARALLAX_EFFECTS = /*#__PURE__*/Object.values(ValidCSSEffects);
var MAP_EFFECT_TO_DEFAULT_UNIT = {
  speed: 'px',
  translateX: '%',
  translateY: '%',
  rotate: 'deg',
  rotateX: 'deg',
  rotateY: 'deg',
  rotateZ: 'deg',
  scale: '',
  scaleX: '',
  scaleY: '',
  scaleZ: '',
  opacity: ''
};
/**
 * Takes a parallax element effects and parses the properties to get the start and end values and units.
 */

function parseElementTransitionEffects(props, scrollAxis) {
  var parsedEffects = {};
  PARALLAX_EFFECTS.forEach(function (key) {
    var defaultValue = MAP_EFFECT_TO_DEFAULT_UNIT[key]; // If the provided type is a number, this must be the speed prop
    // in which case we need to construct the proper translate config

    if (typeof (props == null ? void 0 : props[key]) === 'number') {
      var value = props == null ? void 0 : props[key];
      var startSpeed = (value || 0) * 10 + "px";
      var endSpeed = (value || 0) * -10 + "px";
      var startParsed = parseValueAndUnit(startSpeed);
      var endParsed = parseValueAndUnit(endSpeed);
      var speedConfig = {
        start: startParsed.value,
        end: endParsed.value,
        unit: startParsed.unit
      }; // Manually set translate y value

      if (scrollAxis === ScrollAxis.vertical) {
        parsedEffects.translateY = speedConfig;
      } // Manually set translate y value


      if (scrollAxis === ScrollAxis.horizontal) {
        parsedEffects.translateX = speedConfig;
      }
    } // The rest are standard effect being parsed


    if (Array.isArray(props == null ? void 0 : props[key])) {
      var _value = props == null ? void 0 : props[key];

      if (typeof _value[0] !== 'undefined' && typeof _value[1] !== 'undefined') {
        var _startParsed = parseValueAndUnit(_value == null ? void 0 : _value[0], defaultValue);

        var _endParsed = parseValueAndUnit(_value == null ? void 0 : _value[1], defaultValue);

        var easing = createEasingFunction(_value == null ? void 0 : _value[2]);
        parsedEffects[key] = {
          start: _startParsed.value,
          end: _endParsed.value,
          unit: _startParsed.unit,
          easing: easing
        };

        if (_startParsed.unit !== _endParsed.unit) {
          throw new Error('Must provide matching units for the min and max offset values of each axis.');
        }
      }
    }
  });
  return parsedEffects;
}

/**
 * Returns the percent (0 - 100) moved based on position in the viewport
 */
function getProgressAmount(
/*
 * The start value from cache
 */
start,
/*
 * total dist the element has to move to be 100% complete (view width/height + element width/height)
 */
totalDist,
/*
 * Current scroll value
 */
currentScroll,
/*
 * an optional easing function to apply
 */
easing) {
  // adjust cached value
  var startAdjustedScroll = currentScroll - start; // Amount the element has moved based on current and total distance to move

  var amount = startAdjustedScroll / totalDist; // Apply bezier easing if provided

  if (easing) {
    amount = easing(amount);
  }

  return amount;
}

/**
 * Takes two values (start, end) and returns whether the current scroll is within range
 * @param {number} start - start of scroll (x/y)
 * @param {number} end - end of scroll (x/y)
 * @param {number} scroll - current scroll (x/y)
 * @return {boolean} isInView
 */
function isElementInView(start, end, scroll) {
  var isInView = scroll >= start && scroll <= end;
  return isInView;
}

// Scale between AKA normalize
function scaleBetween(value, newMin, newMax, oldMin, oldMax) {
  return (newMax - newMin) * (value - oldMin) / (oldMax - oldMin) + newMin;
}

/**
 * Scales a start and end value of an effect based on percent moved and easing function
 */

function scaleEffectByProgress(effect, progress) {
  var value = scaleBetween(typeof effect.easing === 'function' ? effect.easing(progress) : progress, (effect == null ? void 0 : effect.start) || 0, (effect == null ? void 0 : effect.end) || 0, 0, 1);
  return {
    value: value,
    unit: effect == null ? void 0 : effect.unit
  };
}

var TRANSFORM_EFFECTS = /*#__PURE__*/Object.values(ValidCSSEffects).filter(function (v) {
  return v !== 'opacity';
});
function setWillChangeStyles(el, effects) {
  var keys = Object.keys(effects);
  var hasOpacity = keys.includes('opacity');
  var willChange = "transform" + (hasOpacity ? ',opacity' : '');
  el.style.willChange = willChange;
}
function setElementStyles(effects, progress, el) {
  if (!el) return;
  var transform = getTransformStyles(effects, progress);
  var opacity = getOpacityStyles(effects, progress);
  el.style.transform = transform;
  el.style.opacity = opacity;
}
function getOpacityStyles(effects, progress) {
  var scaledOpacity = effects['opacity'] && scaleEffectByProgress(effects['opacity'], progress);

  if (typeof scaledOpacity === 'undefined' || typeof scaledOpacity.value === 'undefined' || typeof scaledOpacity.unit === 'undefined') {
    return '';
  }

  var styleStr = "" + scaledOpacity.value;
  return styleStr;
}
function getTransformStyles(effects, progress) {
  var transform = TRANSFORM_EFFECTS.reduce(function (acc, key) {
    var scaledEffect = // @ts-expect-error
    effects[key] && scaleEffectByProgress(effects[key], progress);

    if (typeof scaledEffect === 'undefined' || typeof scaledEffect.value === 'undefined' || typeof scaledEffect.unit === 'undefined') {
      return acc;
    }

    var styleStr = key + "(" + scaledEffect.value + scaledEffect.unit + ")";
    return acc + styleStr;
  }, '');
  return transform;
}
/**
 * Takes a parallax element and removes parallax offset styles.
 * @param {object} element
 */

function resetStyles(element) {
  var el = element.el;
  if (!el) return;
  el.style.transform = '';
  el.style.opacity = '';
}

function createLimitsForRelativeElements(rect, view, scroll, shouldAlwaysCompleteAnimation) {
  var startY = rect.top - view.height;
  var startX = rect.left - view.width;
  var endY = rect.bottom;
  var endX = rect.right; // add scroll

  startX += scroll.x;
  endX += scroll.x;
  startY += scroll.y;
  endY += scroll.y;

  if (shouldAlwaysCompleteAnimation) {
    if (scroll.y + rect.top < view.height) {
      startY = 0;
    }

    if (scroll.x + rect.left < view.width) {
      startX = 0;
    }

    if (endY > view.scrollHeight - view.height) {
      endY = view.scrollHeight - view.height;
    }

    if (endX > view.scrollWidth - view.width) {
      endX = view.scrollWidth - view.width;
    }
  }

  var limits = new Limits({
    startX: startX,
    startY: startY,
    endX: endX,
    endY: endY
  });
  return limits;
}

function getTranslateScalar(startTranslatePx, endTranslatePx, totalDist) {
  var slow = endTranslatePx > startTranslatePx; // calculating necessary scale to increase translations

  var totalAbsOff = (Math.abs(startTranslatePx) + Math.abs(endTranslatePx)) * (slow ? -1 : 1);
  var totalDistTrue = totalDist + totalAbsOff; // Determine multiple to scale by, only values greater than 1

  var scale = Math.max(totalDist / totalDistTrue, 1);
  return scale;
}

/**
 * Return the start and end pixel values for an elements translations
 */
function getStartEndValueInPx(translate, elementSize) {
  var start = translate.start,
      end = translate.end,
      unit = translate.unit;

  if (unit === '%') {
    var scale = elementSize / 100;
    start = start * scale;
    end = end * scale;
  }

  if (unit === 'vw') {
    var startScale = start / 100;
    var endScale = end / 100;
    start = window.innerWidth * startScale;
    end = window.innerWidth * endScale;
  }

  if (unit === 'vh') {
    var _startScale = start / 100;

    var _endScale = end / 100;

    start = window.innerHeight * _startScale;
    end = window.innerHeight * _endScale;
  }

  return {
    start: start,
    end: end
  };
}

var DEFAULT_VALUE = {
  start: 0,
  end: 0,
  unit: ''
};
function createLimitsWithTranslationsForRelativeElements(rect, view, effects, scroll, scrollAxis, shouldAlwaysCompleteAnimation) {
  // get start and end accounting for percent effects
  var translateX = effects.translateX || DEFAULT_VALUE;
  var translateY = effects.translateY || DEFAULT_VALUE;

  var _getStartEndValueInPx = getStartEndValueInPx(translateX, rect.width),
      startTranslateXPx = _getStartEndValueInPx.start,
      endTranslateXPx = _getStartEndValueInPx.end;

  var _getStartEndValueInPx2 = getStartEndValueInPx(translateY, rect.height),
      startTranslateYPx = _getStartEndValueInPx2.start,
      endTranslateYPx = _getStartEndValueInPx2.end; // default starting values


  var startY = rect.top - view.height;
  var startX = rect.left - view.width;
  var endY = rect.bottom;
  var endX = rect.right;
  var startMultiplierY = 1;
  var endMultiplierY = 1;

  if (scrollAxis === ScrollAxis.vertical) {
    startMultiplierY = getTranslateScalar(startTranslateYPx, endTranslateYPx, view.height + rect.height);
    endMultiplierY = startMultiplierY;
  }

  var startMultiplierX = 1;
  var endMultiplierX = 1;

  if (scrollAxis === ScrollAxis.horizontal) {
    startMultiplierX = getTranslateScalar(startTranslateXPx, endTranslateXPx, view.width + rect.width);
    endMultiplierX = startMultiplierX;
  } // Apply the scale to initial values


  if (startTranslateYPx < 0) {
    startY = startY + startTranslateYPx * startMultiplierY;
  }

  if (endTranslateYPx > 0) {
    endY = endY + endTranslateYPx * endMultiplierY;
  }

  if (startTranslateXPx < 0) {
    startX = startX + startTranslateXPx * startMultiplierX;
  }

  if (endTranslateXPx > 0) {
    endX = endX + endTranslateXPx * endMultiplierX;
  } // add scroll


  startX += scroll.x;
  endX += scroll.x;
  startY += scroll.y;
  endY += scroll.y; // NOTE: please refactor and isolate this :(

  if (shouldAlwaysCompleteAnimation) {
    var topBeginsInView = scroll.y + rect.top < view.height;
    var leftBeginsInView = scroll.x + rect.left < view.width;
    var bottomEndsInView = scroll.y + rect.bottom > view.scrollHeight - view.height;
    var rightEndsInView = scroll.x + rect.right > view.scrollWidth - view.height;

    if (topBeginsInView && bottomEndsInView) {
      startMultiplierY = 1;
      endMultiplierY = 1;
      startY = 0;
      endY = view.scrollHeight - view.height;
    }

    if (leftBeginsInView && rightEndsInView) {
      startMultiplierX = 1;
      endMultiplierX = 1;
      startX = 0;
      endX = view.scrollWidth - view.width;
    }

    if (!topBeginsInView && bottomEndsInView) {
      startY = rect.top - view.height + scroll.y;
      endY = view.scrollHeight - view.height;
      var totalDist = endY - startY;
      startMultiplierY = getTranslateScalar(startTranslateYPx, endTranslateYPx, totalDist);
      endMultiplierY = 1;

      if (startTranslateYPx < 0) {
        startY = startY + startTranslateYPx * startMultiplierY;
      }
    }

    if (!leftBeginsInView && rightEndsInView) {
      startX = rect.left - view.width + scroll.x;
      endX = view.scrollWidth - view.width;

      var _totalDist = endX - startX;

      startMultiplierX = getTranslateScalar(startTranslateXPx, endTranslateXPx, _totalDist);
      endMultiplierX = 1;

      if (startTranslateXPx < 0) {
        startX = startX + startTranslateXPx * startMultiplierX;
      }
    }

    if (topBeginsInView && !bottomEndsInView) {
      startY = 0;
      endY = rect.bottom + scroll.y;

      var _totalDist2 = endY - startY;

      startMultiplierY = 1;
      endMultiplierY = getTranslateScalar(startTranslateYPx, endTranslateYPx, _totalDist2);

      if (endTranslateYPx > 0) {
        endY = endY + endTranslateYPx * endMultiplierY;
      }
    }

    if (leftBeginsInView && !rightEndsInView) {
      startX = 0;
      endX = rect.right + scroll.x;

      var _totalDist3 = endX - startX;

      startMultiplierX = 1;
      endMultiplierX = getTranslateScalar(startTranslateXPx, endTranslateXPx, _totalDist3);

      if (endTranslateXPx > 0) {
        endX = endX + endTranslateXPx * endMultiplierX;
      }
    }
  }

  var limits = new Limits({
    startX: startX,
    startY: startY,
    endX: endX,
    endY: endY,
    startMultiplierX: startMultiplierX,
    endMultiplierX: endMultiplierX,
    startMultiplierY: startMultiplierY,
    endMultiplierY: endMultiplierY
  });
  return limits;
}

function scaleTranslateEffectsForSlowerScroll(effects, limits) {
  var effectsCopy = _extends({}, effects);

  if (effectsCopy.translateX) {
    effectsCopy.translateX = _extends({}, effects.translateX, {
      start: effectsCopy.translateX.start * limits.startMultiplierX,
      end: effectsCopy.translateX.end * limits.endMultiplierX
    });
  }

  if (effectsCopy.translateY) {
    effectsCopy.translateY = _extends({}, effects.translateY, {
      start: effectsCopy.translateY.start * limits.startMultiplierY,
      end: effectsCopy.translateY.end * limits.endMultiplierY
    });
  }

  return effectsCopy;
}

function getShouldScaleTranslateEffects(props, effects, scrollAxis) {
  if (props.rootMargin || props.targetElement || props.shouldDisableScalingTranslations) {
    return false;
  }

  if (!!effects.translateX && scrollAxis === ScrollAxis.horizontal || !!effects.translateY && scrollAxis === ScrollAxis.vertical) {
    return true;
  }

  return false;
}

var clamp = function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
};

var Element = /*#__PURE__*/function () {
  function Element(options) {
    this.el = options.el;
    this.props = options.props;
    this.scrollAxis = options.scrollAxis;
    this.id = createId();
    this.effects = parseElementTransitionEffects(this.props, this.scrollAxis);
    this.isInView = null;
    this.progress = 0;

    this._setElementEasing(options.props.easing);

    setWillChangeStyles(options.el, this.effects);
  }

  var _proto = Element.prototype;

  _proto.updateProps = function updateProps(nextProps) {
    this.props = _extends({}, this.props, nextProps);
    this.effects = parseElementTransitionEffects(nextProps, this.scrollAxis);

    this._setElementEasing(nextProps.easing);

    return this;
  };

  _proto.setCachedAttributes = function setCachedAttributes(view, scroll) {
    // NOTE: Must reset styles before getting the rect, as it might impact the natural position
    resetStyles(this);
    this.rect = new Rect({
      el: this.props.targetElement || this.el,
      rootMargin: this.props.rootMargin,
      view: view
    });
    var shouldScaleTranslateEffects = getShouldScaleTranslateEffects(this.props, this.effects, this.scrollAxis);

    if (typeof this.props.startScroll === 'number' && typeof this.props.endScroll === 'number') {
      this.limits = new Limits({
        startX: this.props.startScroll,
        startY: this.props.startScroll,
        endX: this.props.endScroll,
        endY: this.props.endScroll
      }); // Undo the reset -- place it back at current position with styles

      this._setElementStyles();

      return this;
    }

    if (shouldScaleTranslateEffects) {
      this.limits = createLimitsWithTranslationsForRelativeElements(this.rect, view, this.effects, scroll, this.scrollAxis, this.props.shouldAlwaysCompleteAnimation);
      this.scaledEffects = scaleTranslateEffectsForSlowerScroll(this.effects, this.limits);
    } else {
      this.limits = createLimitsForRelativeElements(this.rect, view, scroll, this.props.shouldAlwaysCompleteAnimation);
    } // Undo the reset -- place it back at current position with styles


    this._setElementStyles();

    return this;
  };

  _proto._updateElementIsInView = function _updateElementIsInView(nextIsInView) {
    // NOTE: Check if this is the first change to make sure onExit isn't called
    var isFirstChange = this.isInView === null;

    if (nextIsInView !== this.isInView) {
      if (nextIsInView) {
        this.props.onEnter && this.props.onEnter(this);
      } else if (!isFirstChange) {
        this._setFinalProgress();

        this._setElementStyles();

        this.props.onExit && this.props.onExit(this);
      }
    }

    this.isInView = nextIsInView;
  };

  _proto._setFinalProgress = function _setFinalProgress() {
    var finalProgress = clamp(Math.round(this.progress), 0, 1);

    this._updateElementProgress(finalProgress);
  };

  _proto._setElementStyles = function _setElementStyles() {
    if (this.props.disabled) return;
    var effects = this.scaledEffects || this.effects;
    setElementStyles(effects, this.progress, this.el);
  };

  _proto._updateElementProgress = function _updateElementProgress(nextProgress) {
    this.progress = nextProgress;
    this.props.onProgressChange && this.props.onProgressChange(this.progress);
    this.props.onChange && this.props.onChange(this);
  };

  _proto._setElementEasing = function _setElementEasing(easing) {
    this.easing = createEasingFunction(easing);
  };

  _proto.updatePosition = function updatePosition(scroll) {
    if (!this.limits) return this;
    var isVertical = this.scrollAxis === ScrollAxis.vertical;
    var isFirstChange = this.isInView === null; // based on scroll axis

    var start = isVertical ? this.limits.startY : this.limits.startX;
    var end = isVertical ? this.limits.endY : this.limits.endX;
    var total = isVertical ? this.limits.totalY : this.limits.totalX;
    var s = isVertical ? scroll.y : scroll.x; // check if in view

    var nextIsInView = isElementInView(start, end, s);

    this._updateElementIsInView(nextIsInView); // set the progress if in view or this is the first change


    if (nextIsInView) {
      var nextProgress = getProgressAmount(start, total, s, this.easing);

      this._updateElementProgress(nextProgress);

      this._setElementStyles();
    } else if (isFirstChange) {
      // NOTE: this._updateElementProgress -- dont use this because it will trigger onChange
      this.progress = clamp(Math.round(getProgressAmount(start, total, s, this.easing)), 0, 1);

      this._setElementStyles();
    }

    return this;
  };

  return Element;
}();

var View = /*#__PURE__*/function () {
  function View(config) {
    this.scrollContainer = config.scrollContainer;
    this.width = config.width;
    this.height = config.height;
    this.scrollHeight = config.scrollHeight;
    this.scrollWidth = config.scrollWidth;
  }

  var _proto = View.prototype;

  _proto.hasChanged = function hasChanged(params) {
    if (params.width !== this.width || params.height !== this.height || params.scrollWidth !== this.scrollWidth || params.scrollHeight !== this.scrollHeight) {
      return true;
    }

    return false;
  };

  _proto.setSize = function setSize(params) {
    this.width = params.width;
    this.height = params.height;
    this.scrollHeight = params.scrollHeight;
    this.scrollWidth = params.scrollWidth;
    return this;
  };

  return View;
}();

var Scroll = /*#__PURE__*/function () {
  function Scroll(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
  }

  var _proto = Scroll.prototype;

  _proto.setScroll = function setScroll(x, y) {
    this.dx = x - this.x;
    this.dy = y - this.y;
    this.x = x;
    this.y = y;
    return this;
  };

  return Scroll;
}();

function testForPassiveScroll() {
  var supportsPassiveOption = false;

  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function get() {
        supportsPassiveOption = true;
        return true;
      }
    }); // @ts-expect-error

    window.addEventListener('test', null, opts); // @ts-expect-error

    window.removeEventListener('test', null, opts);
  } catch (e) {}

  return supportsPassiveOption;
}

/**
 * -------------------------------------------------------
 * Parallax Controller
 * -------------------------------------------------------
 *
 * The global controller for setting up and managing a scroll view of elements.
 *
 */

var ParallaxController = /*#__PURE__*/function () {
  function ParallaxController(_ref) {
    var _ref$scrollAxis = _ref.scrollAxis,
        scrollAxis = _ref$scrollAxis === void 0 ? ScrollAxis.vertical : _ref$scrollAxis,
        scrollContainer = _ref.scrollContainer;
    this.scrollAxis = scrollAxis; // All parallax elements to be updated

    this.elements = [];
    this._hasScrollContainer = !!scrollContainer;
    this.viewEl = scrollContainer != null ? scrollContainer : window; // Scroll and View

    var _this$_getScrollPosit = this._getScrollPosition(),
        x = _this$_getScrollPosit[0],
        y = _this$_getScrollPosit[1];

    this.scroll = new Scroll(x, y);
    this.view = new View({
      width: 0,
      height: 0,
      scrollWidth: 0,
      scrollHeight: 0,
      scrollContainer: this._hasScrollContainer ? scrollContainer : undefined
    }); // Ticking

    this._ticking = false; // Passive support

    this._supportsPassive = testForPassiveScroll(); // Bind methods to class

    this._bindAllMethods();

    this._addListeners(this.viewEl);

    this._addResizeObserver();

    this._setViewSize();
  }
  /**
   * Static method to instantiate the ParallaxController.
   * @returns {Class} ParallaxController
   */


  ParallaxController.init = function init(options) {
    var hasWindow = typeof window !== 'undefined';

    if (!hasWindow) {
      throw new Error('Looks like ParallaxController.init() was called on the server. This method must be called on the client.');
    }

    return new ParallaxController(options);
  };

  var _proto = ParallaxController.prototype;

  _proto._bindAllMethods = function _bindAllMethods() {
    var _this = this;

    ['_addListeners', '_removeListeners', '_getScrollPosition', '_handleScroll', '_handleUpdateCache', '_updateAllElements', '_updateElementPosition', '_setViewSize', '_addResizeObserver', '_checkIfViewHasChanged', '_getViewParams', 'getElements', 'createElement', 'removeElementById', 'resetElementStyles', 'updateElementPropsById', 'update', 'updateScrollContainer', 'destroy'].forEach(function (method) {
      // @ts-expect-error
      _this[method] = _this[method].bind(_this);
    });
  };

  _proto._addListeners = function _addListeners(el) {
    el.addEventListener('scroll', this._handleScroll, this._supportsPassive ? {
      passive: true
    } : false);
    window.addEventListener('resize', this._handleUpdateCache, false);
    window.addEventListener('blur', this._handleUpdateCache, false);
    window.addEventListener('focus', this._handleUpdateCache, false);
    window.addEventListener('load', this._handleUpdateCache, false);
  };

  _proto._removeListeners = function _removeListeners(el) {
    var _this$_resizeObserver;

    el.removeEventListener('scroll', this._handleScroll, false);
    window.removeEventListener('resize', this._handleUpdateCache, false);
    window.removeEventListener('blur', this._handleUpdateCache, false);
    window.removeEventListener('focus', this._handleUpdateCache, false);
    window.removeEventListener('load', this._handleUpdateCache, false);
    (_this$_resizeObserver = this._resizeObserver) == null ? void 0 : _this$_resizeObserver.disconnect();
  };

  _proto._addResizeObserver = function _addResizeObserver() {
    var _this2 = this;

    try {
      var observedEl = this._hasScrollContainer ? this.viewEl : document.documentElement;
      this._resizeObserver = new ResizeObserver(function () {
        return _this2.update();
      });

      this._resizeObserver.observe(observedEl);
    } catch (e) {
      console.warn('Failed to create the resize observer in the ParallaxContoller');
    }
  };

  _proto._getScrollPosition = function _getScrollPosition() {
    // Save current scroll
    // Supports IE 9 and up.
    var nx = this._hasScrollContainer ? // @ts-expect-error
    this.viewEl.scrollLeft : window.pageXOffset;
    var ny = this._hasScrollContainer ? // @ts-expect-error
    this.viewEl.scrollTop : window.pageYOffset;
    return [nx, ny];
  }
  /**
   * Window scroll handler sets scroll position
   * and then calls '_updateAllElements()'.
   */
  ;

  _proto._handleScroll = function _handleScroll() {
    var _this$_getScrollPosit2 = this._getScrollPosition(),
        nx = _this$_getScrollPosit2[0],
        ny = _this$_getScrollPosit2[1];

    this.scroll.setScroll(nx, ny); // Only called if the last animation request has been
    // completed and there are parallax elements to update

    if (!this._ticking && this.elements.length > 0) {
      this._ticking = true; // @ts-ignore

      window.requestAnimationFrame(this._updateAllElements);
    }
  }
  /**
   * Window resize handler. Sets the new window inner height
   * then updates parallax element attributes and positions.
   */
  ;

  _proto._handleUpdateCache = function _handleUpdateCache() {
    this._setViewSize();

    this._updateAllElements({
      updateCache: true
    });
  }
  /**
   * Update element positions.
   * Determines if the element is in view based on the cached
   * attributes, if so set the elements parallax styles.
   */
  ;

  _proto._updateAllElements = function _updateAllElements(_temp) {
    var _this3 = this;

    var _ref2 = _temp === void 0 ? {} : _temp,
        updateCache = _ref2.updateCache;

    if (this.elements) {
      this.elements.forEach(function (element) {
        if (updateCache) {
          element.setCachedAttributes(_this3.view, _this3.scroll);
        }

        _this3._updateElementPosition(element);
      });
    } // reset ticking so more animations can be called


    this._ticking = false;
  }
  /**
   * Update element positions.
   * Determines if the element is in view based on the cached
   * attributes, if so set the elements parallax styles.
   */
  ;

  _proto._updateElementPosition = function _updateElementPosition(element) {
    if (element.props.disabled) return;
    element.updatePosition(this.scroll);
  }
  /**
   * Gets the params to set in the View from the scroll container or the window
   */
  ;

  _proto._getViewParams = function _getViewParams() {
    if (this._hasScrollContainer) {
      // @ts-expect-error
      var _width = this.viewEl.offsetWidth; // @ts-expect-error

      var _height = this.viewEl.offsetHeight; // @ts-expect-error

      var _scrollHeight = this.viewEl.scrollHeight; // @ts-expect-error

      var _scrollWidth = this.viewEl.scrollWidth;
      return this.view.setSize({
        width: _width,
        height: _height,
        scrollHeight: _scrollHeight,
        scrollWidth: _scrollWidth
      });
    }

    var html = document.documentElement;
    var width = window.innerWidth || html.clientWidth;
    var height = window.innerHeight || html.clientHeight;
    var scrollHeight = html.scrollHeight;
    var scrollWidth = html.scrollWidth;
    return {
      width: width,
      height: height,
      scrollHeight: scrollHeight,
      scrollWidth: scrollWidth
    };
  }
  /**
   * Cache the view attributes
   */
  ;

  _proto._setViewSize = function _setViewSize() {
    return this.view.setSize(this._getViewParams());
  }
  /**
   * Checks if any of the cached attributes of the view have changed.
   * @returns boolean
   */
  ;

  _proto._checkIfViewHasChanged = function _checkIfViewHasChanged() {
    return this.view.hasChanged(this._getViewParams());
  }
  /**
   * -------------------------------------------------------
   * Public methods
   * -------------------------------------------------------
   */

  /**
   * Returns all the parallax elements in the controller
   */
  ;

  _proto.getElements = function getElements() {
    return this.elements;
  }
  /**
   * Creates and returns new parallax element with provided options to be managed by the controller.
   */
  ;

  _proto.createElement = function createElement(options) {
    var newElement = new Element(_extends({}, options, {
      scrollAxis: this.scrollAxis
    }));
    newElement.setCachedAttributes(this.view, this.scroll);
    this.elements = this.elements ? [].concat(this.elements, [newElement]) : [newElement];

    this._updateElementPosition(newElement); // NOTE: This checks if the view has changed then update the controller and all elements if it has
    // This shouldn't always be necessary with a resize observer watching the view element
    // but there seems to be cases where the resize observer does not catch and update.


    if (this._checkIfViewHasChanged()) {
      this.update();
    }

    return newElement;
  }
  /**
   * Remove an element by id
   */
  ;

  _proto.removeElementById = function removeElementById(id) {
    if (!this.elements) return;
    this.elements = this.elements.filter(function (el) {
      return el.id !== id;
    });
  }
  /**
   * Updates an existing parallax element object with new options.
   */
  ;

  _proto.updateElementPropsById = function updateElementPropsById(id, props) {
    if (this.elements) {
      this.elements = this.elements.map(function (el) {
        if (el.id === id) {
          return el.updateProps(props);
        }

        return el;
      });
    }

    this.update();
  }
  /**
   * Remove a target elements parallax styles
   */
  ;

  _proto.resetElementStyles = function resetElementStyles(element) {
    resetStyles(element);
  }
  /**
   * Updates all cached attributes on parallax elements.
   */
  ;

  _proto.update = function update() {
    // Save the latest scroll position because window.scroll
    // may be called and the handle scroll event may not be called.
    var _this$_getScrollPosit3 = this._getScrollPosition(),
        nx = _this$_getScrollPosit3[0],
        ny = _this$_getScrollPosit3[1];

    this.scroll.setScroll(nx, ny);

    this._setViewSize();

    this._updateAllElements({
      updateCache: true
    });
  }
  /**
   * Updates the scroll container of the parallax controller
   */
  ;

  _proto.updateScrollContainer = function updateScrollContainer(el) {
    // remove existing listeners with current el first
    this._removeListeners(this.viewEl);

    this.viewEl = el;
    this._hasScrollContainer = !!el;
    this.view = new View({
      width: 0,
      height: 0,
      scrollWidth: 0,
      scrollHeight: 0,
      scrollContainer: el
    });

    this._setViewSize();

    this._addListeners(this.viewEl);

    this._updateAllElements({
      updateCache: true
    });
  }
  /**
   * Removes all listeners and resets all styles on managed elements.
   */
  ;

  _proto.destroy = function destroy() {
    this._removeListeners(this.viewEl);

    if (this.elements) {
      this.elements.forEach(function (element) {
        return resetStyles(element);
      });
    } // @ts-expect-error


    this.elements = undefined;
  };

  return ParallaxController;
}();

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

var ParallaxContext = /*#__PURE__*/react.createContext(null);

var createController = function createController(options) {
  // Don't initialize on the server
  var isServer = typeof window === 'undefined';

  if (!isServer) {
    // Must not be the server so kick it off...
    return ParallaxController.init(options);
  }

  return null;
};

var ParallaxProvider = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ParallaxProvider, _Component);

  function ParallaxProvider(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.controller = createController({
      scrollAxis: props.scrollAxis,
      scrollContainer: props.scrollContainer
    });
    return _this;
  }

  var _proto = ParallaxProvider.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.scrollContainer !== this.props.scrollContainer) {
      // @ts-ignore
      this.controller.updateScrollContainer(this.props.scrollContainer);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    // @ts-ignore
    this.controller = this.controller.destroy();
  };

  _proto.render = function render() {
    var children = this.props.children;
    return (// @ts-ignore
      react.createElement(ParallaxContext.Provider, {
        value: this.controller
      }, children)
    );
  };

  return ParallaxProvider;
}(react.Component);
ParallaxProvider.defaultProps = {
  scrollAxis: ScrollAxis.vertical
};

export { ParallaxProvider };