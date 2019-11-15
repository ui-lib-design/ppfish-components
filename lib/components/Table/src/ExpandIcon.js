"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ExpandIcon =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ExpandIcon, _React$Component);

  function ExpandIcon() {
    _classCallCheck(this, ExpandIcon);

    return _possibleConstructorReturn(this, _getPrototypeOf(ExpandIcon).apply(this, arguments));
  }

  _createClass(ExpandIcon, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return !(0, _utils.shallowEqual)(nextProps, this.props);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          expandable = _this$props.expandable,
          prefixCls = _this$props.prefixCls,
          onExpand = _this$props.onExpand,
          needIndentSpaced = _this$props.needIndentSpaced,
          expanded = _this$props.expanded,
          record = _this$props.record;

      if (expandable) {
        var expandClassName = expanded ? 'expanded' : 'collapsed';
        return _react["default"].createElement("span", {
          className: "".concat(prefixCls, "-expand-icon ").concat(prefixCls, "-").concat(expandClassName),
          onClick: function onClick(e) {
            return onExpand(record, e);
          }
        });
      } else if (needIndentSpaced) {
        return _react["default"].createElement("span", {
          className: "".concat(prefixCls, "-expand-icon ").concat(prefixCls, "-spaced")
        });
      }

      return null;
    }
  }]);

  return ExpandIcon;
}(_react["default"].Component);

exports["default"] = ExpandIcon;

_defineProperty(ExpandIcon, "propTypes", {
  record: _propTypes["default"].object,
  prefixCls: _propTypes["default"].string,
  expandable: _propTypes["default"].bool,
  expanded: _propTypes["default"].bool,
  needIndentSpaced: _propTypes["default"].bool,
  onExpand: _propTypes["default"].func
});