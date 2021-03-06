import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../Button/index.tsx';

import './style/index.less';

const noop = () => {
};

export default class LoadMore extends React.Component {
  static propTypes = {
    onLoadMore: PropTypes.func,
    status: PropTypes.string,
    defaultText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    loadingText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    errorText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    endText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    extraCls: PropTypes.string,
    buttonSize: PropTypes.string,
  };

  static defaultProps = {
    onLoadMore: noop,
    status: 'default',
    defaultText: '查看更多',
    loadingText: '加载中',
    errorText: '加载失败，请重试',
    endText: '没有更多了',
    buttonSize: 'default',
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      defaultText, onLoadMore, status, buttonSize, loadingText,
      errorText, endText, extraCls, ...otherProps
    } = this.props;
    let buttonText;
    switch (status) {
      case 'default':
        buttonText = defaultText;
        break;
      case 'loading':
        buttonText = loadingText;
        break;
      case 'error':
        buttonText = errorText;
        break;
      case 'end':
        buttonText = endText;
    }
    return (
      <div className={classNames('fishd-loadmore', {[`${extraCls}`]: !!extraCls})}>
        {status === 'end' ?
          <span className="z-load-end">{endText}</span> :
          <Button size={buttonSize} onClick={onLoadMore} loading={status === 'loading'} {...otherProps}>
            {buttonText}
          </Button>
        }
      </div>
    );
  }
}
