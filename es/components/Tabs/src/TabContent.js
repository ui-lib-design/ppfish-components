function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getTransformByIndex, getActiveIndex, getTransformPropValue, getMarginStyle } from './utils';
import Spin from '../../Spin/index.js';

var TabContent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TabContent, _React$Component);

  function TabContent() {
    _classCallCheck(this, TabContent);

    return _possibleConstructorReturn(this, _getPrototypeOf(TabContent).apply(this, arguments));
  }

  _createClass(TabContent, [{
    key: "getTabPanes",
    value: function getTabPanes() {
      var props = this.props;
      var activeKey = props.activeKey;
      var children = props.children;
      var newChildren = [];

      if (props.loading) {
        return React.createElement(Spin.Container, {
          style: {
            height: '100%',
            width: '100%',
            minHeight: '28px'
          }
        }, React.createElement(Spin, {
          spinning: true
        }));
      }

      React.Children.forEach(children, function (child) {
        if (!child) {
          return;
        }

        var key = child.key;
        var active = activeKey === key;
        newChildren.push(React.cloneElement(child, {
          active: active,
          destroyInactiveTabPane: props.destroyInactiveTabPane,
          rootPrefixCls: props.prefixCls
        }));
      });
      return newChildren;
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var props = this.props;
      var prefixCls = props.prefixCls,
          children = props.children,
          activeKey = props.activeKey,
          tabBarPosition = props.tabBarPosition,
          animated = props.animated,
          animatedWithMargin = props.animatedWithMargin;
      var style = props.style;
      var classes = classnames((_classnames = {}, _defineProperty(_classnames, "".concat(prefixCls, "-content"), true), _defineProperty(_classnames, animated ? "".concat(prefixCls, "-content-animated") : "".concat(prefixCls, "-content-no-animated"), true), _classnames));

      if (animated) {
        var activeIndex = getActiveIndex(children, activeKey);

        if (activeIndex !== -1) {
          var animatedStyle = animatedWithMargin ? getMarginStyle(activeIndex, tabBarPosition) : getTransformPropValue(getTransformByIndex(activeIndex, tabBarPosition));
          style = _objectSpread({}, style, {}, animatedStyle);
        } else {
          style = _objectSpread({}, style, {
            display: 'none'
          });
        }
      }

      return React.createElement("div", {
        className: classes,
        style: style
      }, this.getTabPanes());
    }
  }]);

  return TabContent;
}(React.Component);

export { TabContent as default };
TabContent.propTypes = {
  animated: PropTypes.bool,
  animatedWithMargin: PropTypes.bool,
  prefixCls: PropTypes.string,
  children: PropTypes.node,
  activeKey: PropTypes.string,
  // style: PropTypes.any,
  style: PropTypes.object,
  tabBarPosition: PropTypes.string
};
TabContent.defaultProps = {
  animated: true
};