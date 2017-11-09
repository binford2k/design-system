import React from 'react';
import classnames from 'classnames';
import Icon from '../Icon';
import Input from '../Input';

const propTypes = {
  className: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  autoOpen: React.PropTypes.bool,
  size: React.PropTypes.oneOf(['small', 'tiny']),
  onSelect: React.PropTypes.func,
  options: React.PropTypes.array,
};

const defaultProps = {
  autoOpen: false,
  onSelect: () => {},
  options: [],
};

const formatOptions = options => options.map((o, idx) => {
  let option = o;

  if (typeof o === 'string') {
    option = { id: o, value: o };
  } else if (typeof o.id === 'undefined') {
    o.id = idx;
  }

  return option;
});

/**
 * `Select` allows the user to select an item from a list.
 */
class Select extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: undefined,
      options: formatOptions(props.options),
      open: this.props.autoOpen,
    };

    this.onInputClick = this.onInputClick.bind(this);
  }

  componentDidMount() {
    if (this.props.autoOpen) {
      this.input.focus();
    }
  }

  componentWillReceiveProps(newProps) {
    // TODO: conditionally do this
    this.setState({ options: formatOptions(newProps.options) });
  }

  onInputClick() {
    this.setState({ open: true });
  }

  onSelect(option) {
    return (e) => {
      e.preventDefault();

      const options = this.state.options.map((o) => {
        if (o.id === option.id) {
          o.selected = true;
        } else {
          o.selected = false;
        }

        return o;
      });

      this.props.onSelect(option);
      this.setState({
        inputValue: undefined,
        open: false,
        options,
      });
    };
  }

  getCurrentValue() {
    let value = '';

    if (typeof this.state.inputValue !== 'undefined') {
      value = this.state.inputValue;
    } else {
      this.state.options.forEach((option) => {
        if (option.selected) {
          value = option.value;
        }
      });
    }

    return value;
  }

  renderOption(o) {
    const className = classnames('rc-select-menu-item', {
      'rc-select-menu-item-selected': o.selected,
    });

    return (
      <a
        href=""
        onClick={ e => e.preventDefault() }
        className={ className }
        onMouseDown={ this.onSelect(o) }
        key={ o.id }
      >
        { o.value }
      </a>
    );
  }

  renderMenu() {
    let jsx;

    if (this.state.open) {
      const options = this.state.options.map(o => this.renderOption(o));

      jsx = (
        <div className="rc-select-menu">
          { options }
        </div>
      );
    }

    return jsx;
  }

  renderInput() {
    const input = (
      <Input
        dropdown
        onClick={ this.onInputClick }
        onChange={ e => this.setState({ inputValue: e.target.value }) }
        value={ this.getCurrentValue() }
        size={ this.props.size }
        onBlur={ () => this.setState({ open: false }) }
        ref={ (c) => { this.input = c; } }
        focused={ this.state.open }
        onFocus={ () => this.setState({ open: true }) }
        placeholder={ this.props.placeholder }
      />
    );

    return (
      <div className="rc-select-input">
        { input }
        <Icon width="10px" height="10px" type="chevron-down" />
      </div>
    );
  }

  render() {
    const menu = this.renderMenu();
    const input = this.renderInput();
    const className = classnames('rc-select', this.props.className, {
      open: this.state.open,
      small: this.props.size === 'small',
      tiny: this.props.size === 'tiny',
    });

    return (
      <div className={ className }>
        { input }
        { menu }
      </div>
    );
  }
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
