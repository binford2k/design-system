import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Icon from '../icon/Icon';
import { ENTER_KEY_CODE } from '../../constants';

const propTypes = {
  /** Selected state */
  selected: PropTypes.bool,
  className: PropTypes.string,
  onRemove: PropTypes.func,
  onClick: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool,
};

const defaultProps = {
  selected: false,
  className: '',
  onRemove() {},
  onClick: null,
  children: null,
  disabled: false,
};

/**
 * `Tag` is used to repesent a removable, clickable item.
 */
class Tag extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onKeyDownRemove = this.onKeyDownRemove.bind(this);
  }

  onClick(e) {
    const { onClick } = this.props;
    e.preventDefault();

    if (onClick) {
      onClick(e);
    }
  }

  onKeyDownRemove(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.onRemove(e);
    }
  }

  onRemove(e) {
    const { onRemove } = this.props;
    e.preventDefault();
    e.stopPropagation();

    onRemove(e);
  }

  renderContent() {
    const { children } = this.props;

    return <div className="rc-tag-content">{children}</div>;
  }

  renderRemoveButton() {
    const { disabled } = this.props;
    const classNames = classnames('rc-tag-button rc-tag-remove-button', {
      'rc-tag-remove-button-disabled': disabled,
    });

    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a
        role="button"
        tabIndex="0"
        className={classNames}
        onClick={this.onRemove}
        onKeyDown={this.onKeyDownRemove}
      >
        <Icon type="close" size="tiny" />
      </a>
    );
  }

  render() {
    const { onClick, selected, className, disabled } = this.props;

    const classNames = classnames('rc-tag', className, {
      'rc-tag-selected': selected,
      'rc-tag-selectable': onClick,
      'rc-tag-disabled': disabled,
    });

    const content = this.renderContent();
    const removeButton = this.renderRemoveButton();

    const props = {
      className: classNames,
    };

    if (onClick && !disabled) {
      props.role = 'button';
      props.onClick = this.onClick;
    }

    return (
      <div {...props}>
        {content}
        {removeButton}
      </div>
    );
  }
}

Tag.propTypes = propTypes;
Tag.defaultProps = defaultProps;

export default Tag;
