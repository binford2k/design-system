import React from 'react';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import Menu from './menu/Menu';
import MenuHeader from './menu/MenuHeader';

const propTypes = {
  title: React.PropTypes.string,
  onSubmit: React.PropTypes.func,
  onClose: React.PropTypes.func,
  onRemove: React.PropTypes.func,
  className: React.PropTypes.string,
  position: React.PropTypes.string,
  removeable: React.PropTypes.bool,
  submitButtonLabel: React.PropTypes.string,
  closeButtonLabel: React.PropTypes.string,
};

class SlideIn extends React.Component {
  handleClickOutside() {
    if (this.props.onRemove) {
      this.props.onRemove();
    }
  }

  renderContent() {
    return this.props.children;
  }

  renderActions() {
    let closeAction, submitAction;

    if (this.props.onClose) {
      let closeText = this.props.closeButtonLabel || "Close";

      closeAction = (
        <Button label={closeText} onClick={this.props.onClose} secondary />
      );
    }

    if (this.props.onSubmit) {
      let submitText = this.props.submitButtonLabel || "Submit";

      submitAction = (
        <Button label={submitText} onClick={this.props.onSubmit} />
      );
    }

    if (!closeAction && !submitAction) {
      return;
    }

    return (
      <div className="rc-slidein-actions">
        <ButtonGroup>
          { closeAction }
          { submitAction }
        </ButtonGroup>
      </div>
    );
  }

  renderHeader() {
    let onClose;

    if (this.props.removeable && this.props.onRemove) {
      onClose = this.props.onRemove;
    }

    return (
      <MenuHeader
        title={ this.props.title }
        onClose={ onClose }
      />
    );
  }

  render() {
    const actions = this.renderActions();
    const header = this.renderHeader();
    const content = this.renderContent();

    const className = classnames('rc-slidein', {
      'rc-slidein-bottom': this.props.position === 'bottom',
      'rc-slidein-top': this.props.position === 'top',
      'rc-slidein-left': this.props.position === 'left',
      'rc-slidein-right': this.props.position === 'right',
      'rc-slidein-has-actions': actions,
    }, this.props.className);

    return (
      <div className={ className }>
        <Menu>
          { header }
          <div className="rc-slidein-content">
            { content }
          </div>
          { actions }
        </Menu>
      </div>
    );
  }
}

SlideIn.propTypes = propTypes;

export default onClickOutside(SlideIn);
