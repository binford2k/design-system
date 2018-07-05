import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { getKey } from '../../helpers/statics';

const propTypes = {
  title: PropTypes.any,
  /** The title of the active option */
  selected: PropTypes.string,
  /** Class name(s) to apply to subsection element */
  className: PropTypes.string,
  /** Transcends Sidebar to correctly set active states */
  onSubsectionClick: PropTypes.func,
  /** List of subsections options */
  options: PropTypes.array,
};

const defaultProps = {
  title: '',
  selected: null,
  className: '',
  onSubsectionClick: () => {},
  options: [],
};

class Subsection extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    // Set default option as active
    this.props.options.forEach((option) => {
      if (option.default) {
        this.props.onSubsectionClick(option.title);
      }
    });
  }

  onClick(e, title) {
    e.preventDefault();

    if (this.props.onSubsectionClick) {
      this.props.onSubsectionClick(title);
    }
  }

  getSubsectionOptions() {
    return this.props.options.map((option, idx) => {
      const active = option.title === this.props.selected;
      const className = classnames('rc-sidebar-subsection-option', {
        'rc-sidebar-subsection-option-selected': active,
      });

      const props = {
        key: getKey(option, idx),
        className,
      };

      return (
        <li { ...props }>
          <a className="rc-sidebar-subsection-link" role="button" tabIndex={ 0 } onClick={ e => this.onClick(e, option.title) }>
            <div className="rc-sidebar-subsection-option-header">
              <span className="rc-sidebar-subsection-option-title">{ option.title }</span>
            </div>
          </a>
        </li>
      );
    });
  }

  render() {
    const options = this.getSubsectionOptions();

    return (
      <div className="rc-sidebar-subsection">
        <div className="rc-sidebar-subsection-header">
          <span className="rc-sidebar-subsection-title">
            { this.props.title }
          </span>
          { /* add in optional button */ }
        </div>
        <div className="rc-sidebar-subsection-options">
          { options }
        </div>
      </div>
    );
  }
}

Subsection.propTypes = propTypes;
Subsection.defaultProps = defaultProps;

export default Subsection;
