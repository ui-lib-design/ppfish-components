function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import ReactQuill, { Quill } from './quill/index.js';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { addEventListener } from '../../../utils';
import { polyfill } from 'react-lifecycles-compat';
import Spin from '../../Spin/index.js';
import Radio from '../../Radio/index.js';
import Modal from '../../Modal/index.js';
import Input from '../../Input/index.js';
import Button from '../../Button/index.js';
import message from '../../message/index.js';
import CustomToolbar from './toolbar.js';
import CustomSizeBlot from './formats/size.js';
import EmojiBlot from './formats/emoji.js';
import LinkBlot from './formats/link.js';
import ImageBlot from './formats/image.js';
import VideoBlot from './formats/video.js';
import PlainClipboard from './modules/plainClipboard.js';
import ImageDrop from './modules/imageDrop.js';
import '../style/index.less';
Quill.register(EmojiBlot);
Quill.register(LinkBlot);
Quill.register(ImageBlot);
Quill.register(CustomSizeBlot);
Quill.register(VideoBlot);
Quill.register('modules/imageDrop', ImageDrop, true);

var getImageSize = function getImageSize(url, callback) {
  var newImage;
  newImage = document.createElement('img');

  newImage.onload = function () {
    callback(this.width, this.height);
  };

  newImage.src = url;
};

var RichEditor =
/*#__PURE__*/
function (_Component) {
  _inherits(RichEditor, _Component);

  _createClass(RichEditor, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var newState = {};

      if (nextProps.value !== prevState.lastValue) {
        newState['lastValue'] = newState['value'] = nextProps.value;
      }

      if (nextProps.loading !== prevState.loading) {
        newState['loading'] = nextProps.loading;
      }

      return newState;
    }
  }]);

  function RichEditor(props) {
    var _this;

    _classCallCheck(this, RichEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RichEditor).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "formatFontTag", function (value) {
      if (!value) return value;
      var fontTagStart = /(<\s*?)font(\s+)(.*?)(>)/gi,
          fontTagEnd = /(<\s*?\/\s*?)font(\s*?>)/gi;
      value = value.replace(fontTagStart, function ($0, $1, $2, $3, $4) {
        var tagStyle = ' style="',
            tagAttr = ' ';
        $3.replace(/(\w+-?\w+)\s*=\s*["']\s*(.*?)\s*["']/gi, function ($0, $1, $2) {
          var key = $1,
              value = $2;

          switch (key) {
            case 'color':
              {
                tagStyle += 'color:' + value + ';';
                break;
              }

            case 'size':
              {
                tagStyle += 'font-size:' + value + ';';
                break;
              }

            case 'face':
              {
                tagStyle += 'font-family:' + value + ';';
                break;
              }

            default:
              {
                tagAttr += key + '=' + value;
                break;
              }
          }
        });
        tagStyle += '"';
        return $1 + 'span' + $2 + tagStyle + tagAttr + $4;
      });
      return value.replace(fontTagEnd, '$1span$2');
    });

    _defineProperty(_assertThisInitialized(_this), "focus", function () {
      if (!_this.reactQuillRef) return;

      _this.reactQuillRef.focus();
    });

    _defineProperty(_assertThisInitialized(_this), "blur", function () {
      if (!_this.reactQuillRef) return;

      _this.reactQuillRef.blur();
    });

    _defineProperty(_assertThisInitialized(_this), "getEditor", function () {
      if (!_this.reactQuillRef) return;
      return _this.reactQuillRef.getEditor();
    });

    _defineProperty(_assertThisInitialized(_this), "handleLinkModalOk", function () {
      var el = _this.linkModalInputRef.input,
          val = el.value;

      if (val) {
        if (val.length > 1000) {
          message.error('链接地址不得超过1000个字');
          return;
        }

        var quill = _this.getEditor();

        quill.format('myLink', {
          // type: 'default',
          url: val
        });
        el.value = 'http://';

        _this.setState({
          value: quill.getHTML(),
          // 使 RichEditor 与 Quill 同步
          showLinkModal: false
        });
      } else {
        message.error('链接地址不得为空');
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleLinkModalCancel", function () {
      if (_this.linkModalInputRef) {
        _this.linkModalInputRef.input.value = 'http://';
      }

      _this.setState({
        showLinkModal: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleVideoModalOk", function () {
      var val = null;

      if (_this.videoModalInputRef) {
        val = _this.videoModalInputRef.input.value;
      }

      if (val) {
        if (val.length > 1000) {
          message.error('视频链接不得超过1000个字');
          return;
        }

        if (val.indexOf('//') < 0) {
          message.error('视频链接URL格式错误');
          return;
        }

        var quill = _this.getEditor(),
            range = _this.state.curRange ? _this.state.curRange : quill.getSelection(true),
            videoTagAttrs = _this.props.videoTagAttrs;

        _this.insertVideo(range.index, _objectSpread({}, videoTagAttrs, {
          src: val
        }));

        _this.videoModalInputRef && (_this.videoModalInputRef.input.value = '');

        _this.setState({
          value: quill.getHTML(),
          // 使 RichEditor 与 Quill 同步
          showVideoModal: false,
          curRange: null
        });
      } else {
        message.error('视频链接URL不得为空');
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleVideoModalCancel", function () {
      if (_this.videoModalInputRef) {
        _this.videoModalInputRef.input.value = '';
      }

      _this.setState({
        curVideoType: "video_link",
        showVideoModal: false,
        curRange: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleImageModalCancel", function () {
      _this.setState({
        showImageModal: false,
        curRange: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handlePickLocalImage", function () {
      var customInsertImage = _this.props.customInsertImage,
          toolbarCtner = _this.state.toolbarCtner,
          quill = _this.getEditor(),
          fileInput = toolbarCtner.querySelector('input.ql-image[type=file]');

      var getImageCb = function getImageCb(attrs) {
        if (attrs.src == undefined) {
          message.error('请设置图片源地址');
          return;
        }

        var range = _this.state.curRange ? _this.state.curRange : quill.getSelection(true);

        if (attrs.width == undefined || attrs.height == undefined) {
          getImageSize(attrs.src, function (naturalWidth, naturalHeight) {
            attrs.width = naturalWidth;
            attrs.height = naturalHeight;
            quill.insertEmbed(range.index, 'myImage', attrs);
            quill.setSelection(range.index + 1, 'silent');

            _this.setState({
              value: quill.getHTML(),
              // 使 RichEditor 与 Quill 同步
              curRange: null
            });
          });
        } else {
          quill.insertEmbed(range.index, 'myImage', attrs);
          quill.setSelection(range.index + 1, 'silent');

          _this.setState({
            value: quill.getHTML(),
            // 使 RichEditor 与 Quill 同步
            curRange: null
          });
        }
      };

      _this.setState({
        showImageModal: false
      });

      if (customInsertImage && typeof customInsertImage === "function") {
        customInsertImage(getImageCb);
      } else {
        if (fileInput == null) {
          fileInput = document.createElement('input');
          fileInput.setAttribute('type', 'file');
          fileInput.setAttribute('accept', 'image/jpg, image/jpeg, image/png, image/gif, image/bmp');
          fileInput.classList.add('ql-image');
          fileInput.addEventListener('change', function () {
            if (fileInput.files != null && fileInput.files[0] != null) {
              var reader = new FileReader();

              reader.onload = function (e) {
                getImageCb({
                  src: e.target.result
                });
                fileInput.value = "";
              };

              reader.readAsDataURL(fileInput.files[0]);
            }
          });
          toolbarCtner.appendChild(fileInput);
        }

        fileInput.click();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "insertVideo", function (rangeIndex, attrs) {
      var quill = _this.getEditor(),
          prevChar = quill.getText(rangeIndex - 1, 1),
          nextChar = quill.getText(rangeIndex + 1, 1),
          videoNode = document.createElement('video');

      videoNode.onerror = function () {
        message.error('视频无法播放');
      };

      videoNode.src = attrs.src;
      videoNode = null;

      if (rangeIndex > 0 && prevChar != '\n') {
        // 在一行的中间插入视频
        if (nextChar && nextChar != '\n') {
          quill.insertText(rangeIndex, '\n'); // 插入视频前换行，避免丢失文字

          quill.insertEmbed(rangeIndex + 1, 'myVideo', attrs);
          quill.setSelection(rangeIndex + 1, 'silent');
        } else {
          // 在一行的末尾插入视频
          quill.insertEmbed(rangeIndex + 1, 'myVideo', attrs);
          quill.insertText(rangeIndex + 2, '\n'); // 插入视频后换行，避免丢失光标

          quill.setSelection(rangeIndex + 2, 'silent');
        }
      } else {
        // 一行的开头插入视频
        quill.insertEmbed(rangeIndex, 'myVideo', attrs);
        quill.setSelection(rangeIndex + 1, 'silent');
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handlePickLocalVideo", function () {
      var _this$props = _this.props,
          customInsertVideo = _this$props.customInsertVideo,
          videoTagAttrs = _this$props.videoTagAttrs,
          quill = _this.getEditor(); // 获取选区前先聚焦


      var getVideoCb = function getVideoCb(attrs) {
        if (attrs.src == undefined) {
          message.error('请设置视频源地址');
          return;
        }

        var range = _this.state.curRange ? _this.state.curRange : quill.getSelection(true);

        _this.insertVideo(range.index, _objectSpread({}, videoTagAttrs, {}, attrs));

        _this.setState({
          value: quill.getHTML(),
          // 使 RichEditor 与 Quill 同步
          curRange: null
        });
      };

      _this.setState({
        showVideoModal: false
      });

      if (customInsertVideo && typeof customInsertVideo === "function") {
        customInsertVideo(getVideoCb);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleInsertEmoji", function (e) {
      var toolbarCtner = _this.state.toolbarCtner,
          target = e.target,
          clsList = target.classList.value;

      if ((clsList.indexOf('emoji-item') > -1 || clsList.indexOf('emoji-extend-item') > -1) && target.hasAttribute('value')) {
        var el = toolbarCtner.querySelector('button.ql-emoji[data-role="emoji"]');

        if (el == null) {
          el = document.createElement('button');
          toolbarCtner.querySelector('.custom-emoji').appendChild(el);
        }

        el.setAttribute('type', 'button');
        el.setAttribute('data-role', 'emoji');
        el.setAttribute('value', target.getAttribute('value'));
        el.classList.add('ql-emoji', 'hide');
        el.click();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleFormatBackground", function (e) {
      var toolbarCtner = _this.state.toolbarCtner,
          target = e.target;

      if (target.classList.value.indexOf('background-item') > -1 && target.hasAttribute('value')) {
        var el = toolbarCtner.querySelector('button.ql-background[data-role="background"]');

        if (el == null) {
          el = document.createElement('button');
          toolbarCtner.querySelector('.custom-background').appendChild(el);
        }

        el.setAttribute('type', 'button');
        el.setAttribute('data-role', 'background');
        el.setAttribute('value', target.getAttribute('value'));
        el.classList.add('ql-background', 'hide');
        el.click();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleFormatColor", function (e) {
      var toolbarCtner = _this.state.toolbarCtner,
          target = e.target;

      if (target.classList.value.indexOf('color-item') > -1 && target.hasAttribute('value')) {
        var el = toolbarCtner.querySelector('button.ql-color[data-role="color"]');

        if (el == null) {
          el = document.createElement('button');
          toolbarCtner.querySelector('.custom-color').appendChild(el);
        }

        el.setAttribute('type', 'button');
        el.setAttribute('data-role', 'color');
        el.setAttribute('value', target.getAttribute('value'));
        el.classList.add('ql-color', 'hide');
        el.click();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleFormatSize", function (e) {
      var toolbarCtner = _this.state.toolbarCtner,
          target = e.target;

      if (target.classList.value.indexOf('size-item') > -1 && target.hasAttribute('value')) {
        var el = toolbarCtner.querySelector('button.ql-customAttr[data-role="customSize"]');

        if (el == null) {
          el = document.createElement('button');
          toolbarCtner.querySelector('.custom-size').appendChild(el);
        }

        el.setAttribute('type', 'button');
        el.setAttribute('data-role', 'customSize');
        el.setAttribute('value', target.getAttribute('value'));
        el.classList.add('ql-customAttr', 'hide');
        el.click();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleInsertValue", function (e) {
      var toolbarCtner = _this.state.toolbarCtner,
          target = e.target;

      if (target.classList.value.indexOf('insert-value-item') > -1 && target.hasAttribute('value')) {
        var el = toolbarCtner.querySelector('button.ql-customInsertValue[data-role="customInsertValue"]');

        if (el == null) {
          el = document.createElement('button');
          toolbarCtner.querySelector('.custom-insert-value').appendChild(el);
        }

        el.setAttribute('type', 'button');
        el.setAttribute('data-role', 'customInsertValue');
        el.setAttribute('value', target.getAttribute('value'));
        el.classList.add('ql-customInsertValue', 'hide');
        el.click();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (value, delta, source, editor) {
      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(value, delta, source, editor);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelectionChange", function (nextSelection, source, editor) {
      // let { toolbarCtner } = this.state;
      // let quill = this.getEditor();
      // FixBug: 取消高亮区分。a标签添加自定义属性后接带自定义属性的img标签时，在MAC和安卓版的微信公众号中超链接会异常显示出HTML标签。
      // 区分默认的超链接和自定义超链接的高亮
      // if (nextSelection) {
      //   let curFormat;
      // 	if (nextSelection.index > 0 && quill.getText(nextSelection.index - 1, 1)!='\n') {
      // 		curFormat = quill.getFormat(nextSelection.index - 1, 1);
      // 	} else {
      // 		curFormat = quill.getFormat(nextSelection.index, 1);
      // 	}
      //   toolbarCtner.querySelector('.link-active')
      //   && toolbarCtner.querySelector('.link-active').classList.remove('link-active');
      //   if ('myLink' in curFormat) {
      //     let linkType = curFormat['myLink'].type || 'default';
      //     if (linkType == 'default') {
      //       toolbarCtner.querySelector('.ql-myLink')
      //       && toolbarCtner.querySelector('.ql-myLink').classList.add('link-active');
      //     } else {
      //       toolbarCtner.querySelector(`.ql-${linkType}`)
      //       && toolbarCtner.querySelector(`.ql-${linkType}`).classList.add('link-active');
      //     }
      // 	}
      // }
      var onSelectionChange = _this.props.onSelectionChange;
      onSelectionChange && onSelectionChange(nextSelection, source, editor);
    });

    _defineProperty(_assertThisInitialized(_this), "handleVideoTypeChange", function (e) {
      _this.setState({
        curVideoType: e.target.value || "video_link"
      });
    });

    var _this$props2 = _this.props,
        _value = _this$props2.value,
        customLink = _this$props2.customLink,
        supportFontTag = _this$props2.supportFontTag,
        pastePlainText = _this$props2.pastePlainText,
        _customInsertVideo = _this$props2.customInsertVideo; // 粘贴时将富文本转为纯文本

    if (pastePlainText) {
      Quill.register('modules/clipboard', PlainClipboard, true);
    } // this.urlValidator = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,63}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/i;


    _this.onBlurHandler = null;
    var formatValue = _value;

    if (supportFontTag) {
      formatValue = _this.formatFontTag(_value);
    }

    if (_customInsertVideo && typeof _customInsertVideo === "function") {
      _this.isSupportCustomInsertVideo = true;
    }

    _this.state = {
      lastValue: _value,
      value: formatValue || '',
      loading: false,
      showLinkModal: false,
      showVideoModal: false,
      showImageModal: false,
      toolbarCtner: null,
      curRange: null,
      curVideoType: "video_link"
    };
    _this.handlers = {
      myLink: function myLink(value) {
        var onClickToolbarBtn = _this.props.onClickToolbarBtn;

        if (typeof onClickToolbarBtn == 'function' && onClickToolbarBtn('link') === false) {
          return;
        }

        var quill = _this.getEditor(),
            range = quill.getSelection();

        if (range.length !== 0) {
          _this.setState({
            value: quill.getHTML(),
            // 使 RichEditor 与 Quill 同步
            showLinkModal: true
          });
        } else {
          message.error('没有选中文本');
        }
      },
      video: function video(value) {
        var onClickToolbarBtn = _this.props.onClickToolbarBtn;

        if (typeof onClickToolbarBtn == 'function' && onClickToolbarBtn('video') === false) {
          return;
        }

        var quill = _this.getEditor();

        _this.setState({
          value: quill.getHTML(),
          // 使 RichEditor 与 Quill 同步
          showVideoModal: true,
          curRange: quill.getSelection() // 防止插入视频时光标定位错误

        });
      },
      emoji: function emoji(value) {
        var quill = _this.getEditor(),
            range = quill.getSelection(),
            mValue = JSON.parse(value);

        quill.insertEmbed(range.index, 'emoji', {
          type: mValue.type,
          alt: mValue.alt,
          src: mValue.src,
          width: mValue.width,
          height: mValue.height,
          id: mValue.id
        });
        quill.setSelection(range.index + 1);
      },
      // customColor: (color) => {
      //   let quill = this.getEditor(),
      //     range = quill.getSelection();
      //   if (range.length !== 0) {
      //     quill.format('color', color);
      //   }
      // },
      image: function image() {
        var onClickToolbarBtn = _this.props.onClickToolbarBtn;

        if (typeof onClickToolbarBtn == 'function' && onClickToolbarBtn('image') === false) {
          return;
        }

        var quill = _this.getEditor();

        _this.setState({
          value: quill.getHTML(),
          // 使 RichEditor 与 Quill 同步
          showImageModal: true,
          curRange: quill.getSelection()
        });
      },
      clean: function clean() {
        var Parchment = Quill.imports.parchment;

        var quill = _this.getEditor(),
            range = quill.getSelection();

        if (range == null) return;

        if (range.length == 0) {
          var formats = quill.getFormat();
          Object.keys(formats).forEach(function (name) {
            // Clean functionality in existing apps only clean inline formats
            if (Parchment.query(name, Parchment.Scope.INLINE) != null) {
              quill.format(name, false);
            }
          });
        } else {
          quill.removeFormat(range, Quill.sources.USER);
        }
      },
      // 处理定制的插入值
      customInsertValue: function customInsertValue(value) {
        var quill = _this.getEditor(),
            range = quill.getSelection(),
            mValue = JSON.parse(value);

        if (!range) return;

        if (mValue.editable === false) {
          quill.insertText(range.index, mValue.value, {
            customAttr: {
              editable: false
            }
          });
        } else {
          quill.insertText(range.index, mValue.value);
        }
      }
    }; // 处理定制的超链接

    Object.keys(customLink).forEach(function (moduleName) {
      _this.handlers["".concat(moduleName, "Entry")] = function () {
        var range = this.quill.getSelection();

        if (range.length !== 0) {
          this.quill.format('myLink', {
            type: "".concat(moduleName, "Entry"),
            url: customLink[moduleName].url
          });
        } else {
          message.error('没有选中文本');
        }
      };
    });
    return _this;
  }

  _createClass(RichEditor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      /* eslint-disable react/no-did-mount-set-state */
      this.setState({
        toolbarCtner: findDOMNode(this.toolbarRef)
      }, function () {
        if (!_this2.reactQuillRef) return;
        _this2.onBlurHandler = addEventListener(findDOMNode(_this2.reactQuillRef).querySelector('.ql-editor'), 'blur', function () {
          if (!_this2.reactQuillRef) return;

          var editor = _this2.reactQuillRef.getEditor(),
              range = editor.getSelection();

          if (typeof _this2.props.onBlur == "function") {
            _this2.props.onBlur(range, 'user', editor);
          }
        });
      });
      /* eslint-enable react/no-did-mount-set-state */
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      /* eslint-disable react/no-did-update-set-state */
      if (prevState.lastValue != this.state.lastValue && this.props.supportFontTag) {
        this.setState({
          value: this.formatFontTag(this.state.lastValue)
        });
      }
      /* eslint-enable react/no-did-update-set-state */

    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.onBlurHandler) {
        this.onBlurHandler.remove();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          loading = _this$state.loading,
          value = _this$state.value,
          showLinkModal = _this$state.showLinkModal,
          showVideoModal = _this$state.showVideoModal,
          showImageModal = _this$state.showImageModal,
          toolbarCtner = _this$state.toolbarCtner,
          curVideoType = _this$state.curVideoType;

      var _this$props3 = this.props,
          className = _this$props3.className,
          prefixCls = _this$props3.prefixCls,
          toolbar = _this$props3.toolbar,
          placeholder = _this$props3.placeholder,
          customLink = _this$props3.customLink,
          customInsertValue = _this$props3.customInsertValue,
          resizable = _this$props3.resizable,
          style = _this$props3.style,
          getPopupContainer = _this$props3.getPopupContainer,
          customEmoji = _this$props3.customEmoji,
          insertImageTip = _this$props3.insertImageTip,
          insertVideoTip = _this$props3.insertVideoTip,
          onChange = _this$props3.onChange,
          onSelectionChange = _this$props3.onSelectionChange,
          popoverPlacement = _this$props3.popoverPlacement,
          tooltipPlacement = _this$props3.tooltipPlacement,
          imageDrop = _this$props3.imageDrop,
          customDropImage = _this$props3.customDropImage,
          restProps = _objectWithoutProperties(_this$props3, ["className", "prefixCls", "toolbar", "placeholder", "customLink", "customInsertValue", "resizable", "style", "getPopupContainer", "customEmoji", "insertImageTip", "insertVideoTip", "onChange", "onSelectionChange", "popoverPlacement", "tooltipPlacement", "imageDrop", "customDropImage"]);

      delete restProps.customInsertImage;
      var cls = classNames("".concat(prefixCls), {
        'resizable': resizable
      }, className);

      if (value) {
        restProps.value = value;
      } // 上传本地视频时Modal无确认和取消按钮


      var videoFooter = {};

      if (curVideoType == "video_local") {
        videoFooter['footer'] = null;
      }

      return React.createElement("div", {
        className: cls,
        style: style
      }, React.createElement(Modal, {
        title: "\u63D2\u5165\u8D85\u94FE\u63A5",
        className: "".concat(prefixCls, "-link-modal"),
        visible: showLinkModal,
        onOk: this.handleLinkModalOk,
        onCancel: this.handleLinkModalCancel
      }, React.createElement("span", {
        className: "text"
      }, "\u8D85\u94FE\u63A5\u5730\u5740"), React.createElement(Input, {
        ref: function ref(el) {
          return _this3.linkModalInputRef = el;
        },
        style: {
          width: '434px'
        },
        defaultValue: "http://"
      })), React.createElement(Modal, {
        title: "\u63D2\u5165\u56FE\u7247",
        className: "".concat(prefixCls, "-image-modal"),
        visible: showImageModal,
        footer: null,
        onCancel: this.handleImageModalCancel
      }, React.createElement(Button, {
        type: "primary",
        onClick: this.handlePickLocalImage
      }, "\u9009\u62E9\u672C\u5730\u56FE\u7247"), React.createElement("div", {
        className: "tip"
      }, insertImageTip)), React.createElement(Modal, _extends({
        title: "\u63D2\u5165\u89C6\u9891",
        className: "".concat(prefixCls, "-video-modal"),
        visible: showVideoModal
      }, videoFooter, {
        onOk: this.handleVideoModalOk,
        onCancel: this.handleVideoModalCancel
      }), React.createElement(Radio.Group, {
        style: {
          marginBottom: 24
        },
        onChange: this.handleVideoTypeChange,
        value: curVideoType
      }, React.createElement(Radio, {
        value: "video_link"
      }, "\u89C6\u9891\u94FE\u63A5"), this.isSupportCustomInsertVideo ? React.createElement(Radio, {
        value: "video_local"
      }, "\u672C\u5730\u89C6\u9891") : null), curVideoType == "video_local" ? React.createElement(React.Fragment, null, React.createElement(Button, {
        style: {
          display: 'block'
        },
        type: "primary",
        onClick: this.handlePickLocalVideo
      }, "\u9009\u62E9\u672C\u5730\u89C6\u9891"), React.createElement("div", {
        className: "tip"
      }, insertVideoTip)) : React.createElement(Input, {
        ref: function ref(el) {
          return _this3.videoModalInputRef = el;
        },
        style: {
          width: '434px'
        },
        placeholder: "\u8BF7\u8F93\u5165\u89C6\u9891\u94FE\u63A5URL"
      })), React.createElement(CustomToolbar, {
        ref: function ref(el) {
          return _this3.toolbarRef = el;
        },
        className: 'editor-head',
        toolbar: toolbar,
        customEmoji: customEmoji,
        customLink: customLink,
        customInsertValue: customInsertValue,
        handleInsertEmoji: this.handleInsertEmoji,
        handleFormatColor: this.handleFormatColor,
        handleFormatBackground: this.handleFormatBackground,
        handleFormatSize: this.handleFormatSize,
        handleInsertValue: this.handleInsertValue,
        popoverPlacement: popoverPlacement,
        tooltipPlacement: tooltipPlacement,
        getPopupContainer: getPopupContainer
      }), React.createElement(ReactQuill, _extends({}, restProps, {
        ref: function ref(el) {
          return _this3.reactQuillRef = el;
        },
        className: 'editor-body',
        modules: {
          toolbar: {
            container: toolbarCtner,
            handlers: this.handlers
          },
          imageDrop: imageDrop ? {
            customDropImage: customDropImage
          } : null
        },
        placeholder: placeholder,
        onChange: this.handleChange,
        onSelectionChange: this.handleSelectionChange
      })), loading ? React.createElement(Spin, {
        style: {
          position: 'absolute',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.75)'
        }
      }) : null);
    }
  }]);

  return RichEditor;
}(Component);

_defineProperty(RichEditor, "propTypes", {
  className: PropTypes.string,
  customEmoji: PropTypes.array,
  customLink: PropTypes.object,
  customInsertValue: PropTypes.object,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  prefixCls: PropTypes.string,
  imageDrop: PropTypes.bool,
  loading: PropTypes.bool,
  resizable: PropTypes.bool,
  supportFontTag: PropTypes.bool,
  pastePlainText: PropTypes.bool,
  style: PropTypes.object,
  toolbar: PropTypes.array,
  value: PropTypes.string,
  insertImageTip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  insertVideoTip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  popoverPlacement: PropTypes.string,
  tooltipPlacement: PropTypes.string,
  videoTagAttrs: PropTypes.object,
  customDropImage: PropTypes.func,
  customInsertImage: PropTypes.func,
  customInsertVideo: PropTypes.func,
  getPopupContainer: PropTypes.func,
  onChange: PropTypes.func,
  onClickToolbarBtn: PropTypes.func,
  onSelectionChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyPress: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func
});

_defineProperty(RichEditor, "defaultProps", {
  customEmoji: [],
  customLink: {},
  customInsertValue: {},
  insertImageTip: '支持jpg、jpeg、png、gif、bmp格式的图片，最佳显示高度不超过400px，宽度不超过270px。',
  insertVideoTip: React.createElement(React.Fragment, null, React.createElement("span", null, "1\u3001\u5355\u4E2A\u89C6\u9891\u4E0D\u8D85\u8FC710M\uFF0C\u652F\u6301MP4\u3001MPEG4\u3001H264\u3001AAC\u3001WebM\u3001VP8\u3001Vorbis\u3001OggTheora\u683C\u5F0F\u3002\u53D7\u5FAE\u4FE1\u9650\u5236\uFF0C\u5FAE\u4FE1\u7AEF\u4EC5\u652F\u6301\u53D1\u9001MP4\u683C\u5F0F\u89C6\u9891\u3002"), React.createElement("br", null), React.createElement("span", null, "2\u3001\u6700\u4F73\u663E\u793A\u9AD8\u5EA6\u4E0D\u8D85\u8FC7400px, \u5BBD\u5EA6\u4E0D\u8D85\u8FC7270px\u3002")),
  placeholder: '请输入内容',
  prefixCls: 'fishd-richeditor',
  popoverPlacement: 'top',
  tooltipPlacement: 'bottom',
  loading: false,
  imageDrop: false,
  resizable: false,
  pastePlainText: false,
  toolbar: [['link', 'bold', 'italic', 'underline'], ['size'], ['color'], [{
    'align': ''
  }, {
    'align': 'center'
  }, {
    'align': 'right'
  }], [{
    'list': 'ordered'
  }, {
    'list': 'bullet'
  }], ['emoji'], ['image'], ['clean']],
  getPopupContainer: function getPopupContainer() {
    return document.body;
  }
});

polyfill(RichEditor);
export { Quill };
export default RichEditor;