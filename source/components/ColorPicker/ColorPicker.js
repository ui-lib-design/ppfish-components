import React from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';
import Trigger from 'rc-trigger';
import ColorPickerPanel from './Panel';
import placements from './placements';
import Color from './helpers/color';
import QuickPanel from './QuickPanel';


function refFn(field, component) {
  this[field] = component;
}

function prevent(e) {
  e.preventDefault();
}

function noop() {
}

export default class ColorPicker extends React.Component {

  static propTypes = {
    defaultColor: PropTypes.string,
    defaultAlpha: PropTypes.number,
    // can custom
    alpha: PropTypes.number,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    color: PropTypes.string,
    enableAlpha: PropTypes.bool,
    mode: PropTypes.oneOf(['RGB', 'HSL', 'HSB']),
    onChange: PropTypes.func,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    prefixCls: PropTypes.string.isRequired,
    style: PropTypes.object,
    enableHistory: PropTypes.bool,
    maxHistory: PropTypes.number,
    quickMode: PropTypes.bool,
    colorMap: PropTypes.array,
  };

  static defaultProps = {
    defaultColor: '#e93334',
    defaultAlpha: 100,
    enableHistory: true,
    maxHistory: 8,
    onChange: noop,
    onOpen: noop,
    onClose: noop,
    children: <span className="fishd-color-picker-trigger"/>,
    className: '',
    enableAlpha: false,
    prefixCls: 'fishd-color-picker',
    style: {},
    quickMode: false,
    colorMap: ['#e93334', '#e86819', '#ff9b25', '#654520', '#e0c5a6', '#ffe637', '#009a20', '#006812', '#97bb2a', '#b6d130'],
  };

  constructor(props) {
    super(props);

    const alpha = typeof props.alpha === 'undefined'
      ? props.defaultAlpha
      : Math.min(props.alpha, props.defaultAlpha);

    this.state = {
      color: props.color || props.defaultColor,
      alpha,
      open: false,
      colorHistory: []
    };

    this.saveTriggerRef = refFn.bind(this, 'triggerInstance');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.color) {
      this.setState({
        color: nextProps.color,
      });
    }
    if (nextProps.alpha !== null && nextProps.alpha !== undefined) {
      this.setState({
        alpha: nextProps.alpha,
      });
    }
  }

  onTriggerClick = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  onChange = (colors) => {
    this.setState({...colors},
      () => {
        this.props.onChange(this.state);
      },
    );
  };

  onBlur = () => {
    this.setOpen(false);
  };

  onVisibleChange = (open) => {
    this.setOpen(open);
  };

  onPanelMount = (panelDOMRef) => {
    if (this.state.open) {
      setTimeout(() => {
        panelDOMRef.focus();
      }, 1);
    }
  };

  setOpen = (open, callback) => {
    if (this.state.open !== open) {
      this.setState({open},
        () => {
          if (typeof callback === 'function') callback();
          const {onOpen, onClose, enableHistory, maxHistory} = this.props;
          if (this.state.open) {
            onOpen(this.state);
          } else {
            // history record
            if (enableHistory) {
              const {color, alpha, colorHistory} = this.state;
              if (colorHistory.length && color === colorHistory[0].color && alpha === colorHistory[0].alpha) return;
              this.setState({
                colorHistory: colorHistory.length >= maxHistory ?
                  [{color, alpha}, ...colorHistory.slice(0, -1)] : [{color, alpha}, ...colorHistory]
              }, () => {
                onClose(this.state);
              });
            } else {
              onClose(this.state);
            }
          }
        },
      );
    }
  };

  getRootDOMNode = () => {
    return findDOMNode(this);
  };

  getTriggerDOMNode = () => {
    return findDOMNode(this.triggerInstance);
  };

  getPickerElement = () => {
    if (this.props.quickMode) {
      return (
        <QuickPanel
          onMount={this.onPanelMount}
          defaultColor={this.state.color}
          color={this.state.color}
          onChange={this.onChange}
          onBlur={this.onBlur}
          colorMap={this.props.colorMap}
          className={this.props.className}
          quickModeCustom={false}
        />
      );
    }
    return (
      <ColorPickerPanel
        onMount={this.onPanelMount}
        defaultColor={this.state.color}
        alpha={this.state.alpha}
        enableAlpha={this.props.enableAlpha}
        prefixCls={`${this.props.prefixCls}-panel`}
        onChange={this.onChange}
        onBlur={this.onBlur}
        mode={this.props.mode}
        className={this.props.className}
        colorHistory={this.state.colorHistory}
        enableHistory={this.props.enableHistory}
        maxHistory={this.props.maxHistory}
      />
    );
  };

  open = (callback) => {
    this.setOpen(true, callback);
  };

  close = (callback) => {
    this.setOpen(false, callback);
  };

  focus = () => {
    if (!this.state.open) {
      findDOMNode(this).focus();
    }
  };

  render() {
    const props = this.props;
    const state = this.state;
    const classes = [`${props.prefixCls}-wrap`, props.className];
    if (state.open) {
      classes.push(`${props.prefixCls}-open`);
    }

    let children = props.children;

    const [r, g, b] = new Color(this.state.color).RGB;
    const RGBA = [r, g, b];

    RGBA.push(this.state.alpha / 100);

    if (children) {
      children = React.cloneElement(children, {
        ref: this.saveTriggerRef,
        unselectable: 'unselectable',
        style: {
          backgroundColor: `rgba(${RGBA.join(',')})`,
        },
        onClick: this.onTriggerClick,
        onMouseDown: prevent,
      });
    }

    const {
      prefixCls,
      style,
      getPopupContainer,
      align,
      animation,
      disabled,
      transitionName,
      quickMode
    } = props;

    return (
      <div className={classes.join(' ')}>
        <Trigger
          popup={this.getPickerElement()}
          popupAlign={align}
          builtinPlacements={placements}
          popupPlacement={quickMode ? 'topCenter' : 'topLeft'}
          action={disabled ? [] : ['click']}
          destroyPopupOnHide
          getPopupContainer={getPopupContainer}
          popupStyle={style}
          popupAnimation={animation}
          popupTransitionName={transitionName}
          popupVisible={state.open}
          onPopupVisibleChange={this.onVisibleChange}
          prefixCls={prefixCls}
        >
          {children}
        </Trigger>
      </div>
    );
  }
}
