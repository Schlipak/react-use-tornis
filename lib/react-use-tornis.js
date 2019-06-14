(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('tornis')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'tornis'], factory) :
  (global = global || self, factory(global['react-use-tornis'] = {}, global.React, global.tornis));
}(this, function (exports, React, tornis) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;

  var depHasChanged = function depHasChanged(deps, values) {
    return deps.some(function (dep) {
      return values[dep] && values[dep].changed;
    });
  };

  var useTornis = function useTornis(updateCallback) {
    var callOnWatch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var dependencies = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var callback = function callback(values) {
      if (dependencies.length === 0 || depHasChanged(dependencies, values)) {
        updateCallback(values);
      }
    };

    React.useEffect(function () {
      tornis.watchViewport(callback, callOnWatch);
      return function () {
        return tornis.unwatchViewport(callback);
      };
    });
  };

  var compose = function compose(property, updateCallback) {
    var callOnWatch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var callback = function callback(values) {
      updateCallback(values[property]);
    };

    useTornis(callback, callOnWatch);
  };

  var useSize = function useSize(updateCallback) {
    var callOnWatch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return compose('size', updateCallback, callOnWatch);
  };
  var useScroll = function useScroll(updateCallback) {
    var callOnWatch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return compose('scroll', updateCallback, callOnWatch);
  };
  var useMouse = function useMouse(updateCallback) {
    var callOnWatch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return compose('mouse', updateCallback, callOnWatch);
  };
  var useOrientation = function useOrientation(updateCallback) {
    var callOnWatch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return compose('orientation', updateCallback, callOnWatch);
  };

  var withTornis = function withTornis(updateCallback, ChildComponent) {
    var WithTornisHOC = function WithTornisHOC(props) {
      var ref = React.useRef();
      useTornis(function (viewportState) {
        var element = ref.current;
        updateCallback(element, viewportState, props);
      });
      return React__default.createElement(ChildComponent, {
        ref: ref
      });
    };

    return WithTornisHOC;
  };

  exports.default = useTornis;
  exports.useMouse = useMouse;
  exports.useOrientation = useOrientation;
  exports.useScroll = useScroll;
  exports.useSize = useSize;
  exports.withTornis = withTornis;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
